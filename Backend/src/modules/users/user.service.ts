import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { Status } from "src/config/constants";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ErrorService } from '../../config/errors';
import { Doctor } from '../doctors/schema/doctor.schema';
import { DoctorService } from "../doctors/doctor.service";
import { nowTime } from "src/utils/timeUtil";
import { PaginationSortDto } from "../PaginationSort.dto ";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    // @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    private doctorService: DoctorService,
    // private fileUploadService: FileUploadService
  ) { }

  async getOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ 
      email, 
      status: Status.ACTIVE 
    })
    .exec();
    if (!user) {
      throw new HttpException(ErrorService.USER_NOT_FOUND.message, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ 
      _id: id, 
      status: Status.ACTIVE 
    })
    .select('-password') // Loại bỏ trường password
    .exec();
    if (!user) {
      throw new HttpException(ErrorService.USER_NOT_FOUND.message, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // Thêm users
  async create(createUserDto: CreateUserDto, createdBy: string): Promise<User> {
    // Kiểm tra các trường bắt buộc
    const requiredFields = ['email', 'phoneNumber', 'password', 'firstName', 'lastName', 'role'];
    const missingFields = requiredFields.filter(field => !createUserDto[field]);

    if (missingFields.length > 0) {
      throw new HttpException(`Missing required fields: ${missingFields.join(', ')}`, HttpStatus.BAD_REQUEST);
    }
    // Không cho phép tạo người dùng có role là 1 (chuyển role sang số)
    if (Number(createUserDto.role) === 1) {
      throw new HttpException('Không thể tạo người dùng với role là 1.', HttpStatus.FORBIDDEN);
    }

    const existingEmail = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existingEmail) {
      throw new HttpException(ErrorService.USER_ERR_EMAIL_EXISTED.message, HttpStatus.BAD_REQUEST);
    }

    const existingPhone = await this.userModel.findOne({ phoneNumber: createUserDto.phoneNumber }).exec();
    if (existingPhone) {
      throw new HttpException(ErrorService.PHONE_IS_EXISTED.message, HttpStatus.BAD_REQUEST);
    }

    const hash = await bcrypt.hash(createUserDto.password, 10);

    const avatarUrl = createUserDto.avatarUrl || 'uploads/avt-user.jpg';

    const newUser = new this.userModel({
      ...createUserDto,
      password: hash,
      status: Status.ACTIVE,
      avatarUrl,
      createdBy: new Types.ObjectId(createdBy),
    });

    const savedUser = await newUser.save();
    // Sử dụng toObject() và xóa trường password
    const result = savedUser.toObject();
    delete result.password;

    return result;
  }


  // Xóa mềm users
  async batchMoveToTrash(ids: string[], deletedBy: string): Promise<{ successMessages: string[], errorMessages: string[] }> {
    const successMessages: string[] = [];
    const errorMessages: string[] = [];

    // Nếu chỉ có 1 ID thì bỏ qua vòng lặp kiểm tra
    if (ids.length === 1) {
      const user = await this.userModel.findById(ids[0]).exec();
      if (!user) {
        throw new HttpException(ErrorService.USER_NOT_FOUND.message, HttpStatus.NOT_FOUND);
      }

      // Kiểm tra nếu user đã ở trạng thái suspended
      if (user.status === Status.SUSPENDED) {
        throw new HttpException('User is already suspended', HttpStatus.BAD_REQUEST);
      }

      // Cập nhật trạng thái và thông tin xóa của người dùng
      user.status = Status.SUSPENDED;
      user.deletedBy = new Types.ObjectId(deletedBy);
      user.deletedAt = nowTime;
      await user.save();
      successMessages.push(`User with ID ${ids[0]} has been successfully moved to trash.`);
      return { successMessages, errorMessages };
    }

    // Nếu có nhiều ID, kiểm tra từng người dùng
    for (const id of ids) {
      const user = await this.userModel.findById(id).exec();

      if (!user) {
        errorMessages.push(`User with ID ${id} not found.`);
        continue; // Tiếp tục với người dùng tiếp theo
      }

      // Kiểm tra trạng thái
      if (user.status === Status.SUSPENDED) {
        errorMessages.push(`User with ID ${id} cannot be moved to trash because status is already SUSPENDED.`);
        continue; // Tiếp tục với người dùng tiếp theo
      }

      // Cập nhật trạng thái thành SUSPENDED và thêm thông tin xóa
      user.status = Status.SUSPENDED;
      user.deletedBy = new Types.ObjectId(deletedBy);
      user.deletedAt = nowTime;
      await user.save();
      successMessages.push(`User with ID ${id} has been successfully moved to trash.`);
    }

    return { successMessages, errorMessages };
  }


  // Cập nhật thông tin users
  async update(id: string, updateUserDto: UpdateUserDto, updatedBy: string): Promise<User> {

    // Kiểm tra nếu không có trường nào trong updateUserDto
    if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
      throw new HttpException('No data fields provided for update', HttpStatus.BAD_REQUEST);
    }

    const existingEmail = await this.userModel.findOne({ email: updateUserDto.email }).exec();
    if (existingEmail) {
      throw new HttpException(ErrorService.USER_ERR_EMAIL_EXISTED.message, HttpStatus.BAD_REQUEST);
    }

    const existingPhone = await this.userModel.findOne({ phoneNumber: updateUserDto.phoneNumber }).exec();
    if (existingPhone) {
      throw new HttpException(ErrorService.PHONE_IS_EXISTED.message, HttpStatus.BAD_REQUEST);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: { ...updateUserDto, 
        updatedBy:new Types.ObjectId(updatedBy)
      } }, 
      { new: true, runValidators: true }
    ).exec();

    if (!updatedUser) {
      throw new HttpException(ErrorService.USER_NOT_FOUND.message, HttpStatus.NOT_FOUND);
    }

    const result = updatedUser.toObject();
    delete result.password; // Xóa trường password khỏi kết quả trả về

    return result;
  }


  async updateAvatar(id: string, avatarUrl: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: { avatarUrl } },
      { new: true }
    ).exec();

    if (!updatedUser) {
      throw new HttpException(ErrorService.USER_ERR_EMAIL_EXISTED.message, HttpStatus.NOT_FOUND);
    }

    return updatedUser;
  }

  async findAllUsers(query: any = {}, paginationSortDto: PaginationSortDto): Promise<{ users: User[], total: number, page: number, limit: number }> {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', search } = paginationSortDto;
    const skip = (page - 1) * limit;

    const sortOptions = { [sortBy]: sortOrder };

    // Thêm điều kiện tìm kiếm chỉ user Active
    query.status = Status.ACTIVE;

    // Tạo điều kiện tìm kiếm trên các trường phù hợp
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      const searchFields = Object.keys(this.userModel.schema.paths).filter(
        field => {
          const fieldType = this.userModel.schema.paths[field].instance;
          return !['password', 'deletedAt', 'deletedBy', 'avatarUrl'].includes(field) &&
            ['String', 'Mixed'].includes(fieldType);
        }
      );

      query.$or = searchFields.map(field => ({ [field]: searchRegex }));
    }

    const [users, total] = await Promise.all([
      this.userModel.find(query)
        .select('firstName lastName email phoneNumber role status') // Các trường cần lấy
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments(query)
    ]);


    if (!users || users.length === 0) {
      throw new HttpException('Không tìm thấy người dùng', HttpStatus.NOT_FOUND);
    }

    return {
      users,
      total,
      page: Number(page),
      limit: Number(limit)
    };
  }



}

/**
 * Tìm kiếm và phân trang danh sách người dùng
 * 
 * Các cú pháp có thể sử dụng:
 * 1. Tìm kiếm: 
 *    - /api/v1/user/get?search=keyword
 *    (Tìm kiếm trên tất cả các trường String và Mixed)
 * 
 * 2. Phân trang:
 *    - /api/v1/user/get?page=1&limit=10
 *    (Mặc định: page=1, limit=10)
 * 
 * 3. Sắp xếp:
 *    - /api/v1/user/get?sortBy=fieldName&sortOrder=asc
 *    - /api/v1/user/get?sortBy=fieldName&sortOrder=desc
 *    (Mặc định: sortBy='createdAt', sortOrder='desc')
 * 
 * 4. Kết hợp:
 *    - /api/v1/user/get?search=keyword&page=2&limit=20&sortBy=lastName&sortOrder=asc
 * 
 * Lưu ý: 
 * - Tìm kiếm chỉ áp dụng cho các trường kiểu String hoặc Mixed
 * - Các trường password, deletedAt, deletedBy, avatarUrl bị loại trừ khỏi kết quả
 * 
 * @param query - Query conditions
 * @param paginationSortDto - DTO chứa thông tin phân trang và sắp xếp
 * @returns Object chứa danh sách users, tổng số lượng, trang hiện tại và giới hạn mỗi trang
 */