import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Doctor, DoctorDocument } from './schema/doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UserService } from '../users/user.service';
import { Department, DepartmentDocument } from '../departments/schema/department.schema';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    @InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
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
      .populate('department')
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
      .populate('updatedBy')
      .populate('patients')
      .exec();

    return populatedDoctor;
  }


  async remove(ids: string | string[], deletedBy: string): Promise<{ successMessages: string[], errorMessages: string[] }> {
    const doctorIds = Array.isArray(ids) ? ids : [ids];
    const successMessages: string[] = [];
    const errorMessages: string[] = [];
    const userIds: string[] = [];

    for (const id of doctorIds) {
      try {
        const doctor = await this.doctorModel.findById(id).exec();
        if (!doctor) {
          errorMessages.push(`Doctor with ID ${id} not found`);
          continue;
        }

        userIds.push(doctor.user.toString());

        // // Xóa doctor khỏi department
        // if (doctor.department) {
        //   await this.departmentModel.findByIdAndUpdate(
        //     doctor.department,
        //     { $pull: { doctors: doctor._id } }
        //   );
        // }

        // // Xóa các liên kết với bệnh nhân
        // await this.patientModel.updateMany(
        //   { doctor: doctor._id },
        //   { $unset: { doctor: 1 } }
        // );

        // Xóa doctor
        // await this.doctorModel.findByIdAndRemove(id).exec();

        successMessages.push(`Doctor with ID ${id} removed successfully`);
      } catch (error) {
        errorMessages.push(`Error removing doctor with ID ${id}: ${error.message}`);
      }
    }

    // Sử dụng batchMoveToTrash của userService
    if (userIds.length > 0) {
      const userResult = await this.userService.batchMoveToTrash(userIds, deletedBy);
      successMessages.push(...userResult.successMessages);
      errorMessages.push(...userResult.errorMessages);
    }

    return { successMessages, errorMessages };
  }


  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.find().exec();
  }

  async findOne(id: string): Promise<Doctor> {
    return this.doctorModel.findById(id).exec();
  }


}