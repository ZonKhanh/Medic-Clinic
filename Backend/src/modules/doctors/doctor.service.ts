import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { Doctor, DoctorDocument } from './schema/doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UserService } from '../users/user.service';
import { Department, DepartmentDocument } from '../departments/schema/department.schema';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { PaginationSortDto } from '../PaginationSort.dto ';
import { User } from '../users/schema/user.schema';
import { Status } from 'src/config/constants';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    @InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }

  async create(createDoctorDto: CreateDoctorDto, createdBy: string): Promise<Doctor> {
    const { department, user, ...doctorData } = createDoctorDto;

    // Kiểm tra xem department có tồn tại không
    const checkDepartment = await this.departmentModel.findById(department);
    if (!checkDepartment) {
      throw new BadRequestException('Department không tồn tại');
    }

    // Tạo user mới sử dụng UserService
    const createdUser = await this.userService.create(user, createdBy);

    // Tạo doctor mới và liên kết với user và department
    const newDoctor = new this.doctorModel({
      ...doctorData,
      user: (createdUser as any)._id,
      department: new Types.ObjectId(department),
    });
    const savedDoctor = await newDoctor.save();

    // Cập nhật department
    await this.departmentModel.findByIdAndUpdate(
      department,
      { $addToSet: { doctors: savedDoctor._id } }
    );

    // Populate all related fields
    const populatedDoctor = await this.doctorModel.findById(newDoctor._id)
      .populate({
        path: 'user',
        select: '-password', // Loại bỏ trường password
      })
      .populate({
        path: 'department',
        select: 'title, description',
      })
      .populate('patients')
      .exec();

    return populatedDoctor;
  }


  async update(id: string, updateDoctorDto: UpdateDoctorDto, updatedBy: string): Promise<Doctor> {
    // Kiểm tra nếu không có trường nào trong updateDoctorDto
    if (!updateDoctorDto || Object.keys(updateDoctorDto).length === 0) {
      throw new HttpException('No data fields provided for update', HttpStatus.BAD_REQUEST);
    }

    const existingDoctor = await this.doctorModel.findById(id).exec();
    if (!existingDoctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }

    const { user, department, ...doctorData } = updateDoctorDto;

    // Luôn cập nhật thời gian updatedAt cho user, kể cả khi không có thay đổi dữ liệu của user
    const userToUpdate = updateDoctorDto.user || existingDoctor.user; // Nếu không có `user` trong DTO, lấy từ doctor hiện tại
    try {
      const updateUserDto = {
        ...userToUpdate,
        updatedAt: new Date(), // Luôn cập nhật thời gian updatedAt
      };

      await this.userService.update(existingDoctor.user.toString(), updateUserDto as UpdateUserDto, updatedBy);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to update user information', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Cập nhật department nếu có thay đổi
    if (department && department.toString() !== existingDoctor.department.toString()) {
      const newDepartment = await this.departmentModel.findById(department);
      if (!newDepartment) {
        throw new BadRequestException('Department không tồn tại');
      }

      // Xóa doctor khỏi department cũ
      await this.departmentModel.findByIdAndUpdate(
        existingDoctor.department,
        { $pull: { doctors: existingDoctor._id } }
      );

      // Thêm doctor vào department mới
      await this.departmentModel.findByIdAndUpdate(
        department,
        { $addToSet: { doctors: existingDoctor._id } }
      );
    }

    // Cập nhật thông tin doctor
    const updatedDoctor = await this.doctorModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...doctorData,
          department: department || existingDoctor.department,
        }
      },
      { new: true, runValidators: true }
    ).exec();

    if (!updatedDoctor) {
      throw new HttpException('Failed to update doctor', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Populate all related fields
    const populatedDoctor = await this.doctorModel.findById(updatedDoctor._id)
      .populate({
        path: 'user',
        select: '-password', // Loại bỏ trường password
      })
      .populate('department')
      .populate('patients')
      .exec();

    return populatedDoctor;
  }


  async remove(ids: string | string[], deletedBy: string): Promise<{ successMessages: string[], errorMessages: string[] }> {
    const idArray = Array.isArray(ids) ? ids : [ids];
    const doctors = await this.doctorModel.find({ _id: { $in: idArray } })
      .populate('user') // Giả sử trường người dùng trong patient là 'user'
      .exec();

    // Lấy id của user từ từng patient và chuyển đổi thành string
    const userIds = doctors.map(doctor => doctor.user?._id.toString()).filter(Boolean); // Chuyển đổi ObjectId thành string và lọc bỏ giá trị undefined

    // Gọi hàm batchMoveToTrash từ userService
    return this.userService.batchMoveToTrash(userIds, deletedBy);
  }


  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.doctorModel.findById(id)
      .populate({
        path: 'user',
        select: '-password -deletedAt -deletedBy -avatarUrl'
      })
      .populate('department', 'name')
      .exec();

    if (!doctor) {
      throw new HttpException('Không tìm thấy bác sĩ', HttpStatus.NOT_FOUND);
    }

    return doctor;
  }

  async getAllDoctors(paginationSortDto: PaginationSortDto): Promise<{ doctors: Doctor[], total: number, page: number, limit: number }> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', search } = paginationSortDto;
    const skip = (page - 1) * limit;

    const query: any = {};
    const sortOptions: any = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      const searchNumber = parseFloat(search);

      const [departments, users] = await Promise.all([
        this.departmentModel.find({ $or: [{ title: searchRegex }, { description: searchRegex }] }).select('_id'),
        this.userModel.find({
          $or: [
            { firstName: searchRegex },
            { lastName: searchRegex },
            { email: searchRegex },
            { phoneNumber: searchRegex }
          ]
        }).select('_id')
      ]);

      query.$or = [
        { specialization: searchRegex },
        { bio: searchRegex },
        { department: { $in: departments.map(dept => dept._id) } },
        { user: { $in: users.map(user => user._id) } }
      ];

      if (!isNaN(searchNumber)) {
        query.$or.push({ experience: searchNumber }, { education: searchNumber });
      }
    }

    if (sortBy === 'firstName' || sortBy === 'lastName') {
      sortOptions[`user.${sortBy}`] = sortOrder;
    } else if (sortBy === 'department') {
      sortOptions['department.title'] = sortOrder;
    } else {
      sortOptions[sortBy] = sortOrder;
    }

    const [doctors, total] = await Promise.all([
      this.doctorModel.find(query)
        .select('specialization experience')
        .populate({
          path: 'user',
          select: 'lastName firstName phoneNumber status email',
          match: { status: Status.ACTIVE }
        })
        .populate('department', 'title')
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      this.doctorModel.countDocuments({
        ...query,
        user: { $in: (await this.userModel.find({ status: Status.ACTIVE }).select('_id')).map(u => u._id) }
      })
    ]);

    const activeDoctors = doctors.filter(doctor => doctor.user); // Lọc bỏ các bác sĩ có user bị null (do không thỏa mãn điều kiện status)

    if (!activeDoctors.length) {
      throw new HttpException('Không tìm thấy bác sĩ', HttpStatus.NOT_FOUND);
    }

    return { doctors: activeDoctors, total, page: Number(page), limit: Number(limit) };
  }


}