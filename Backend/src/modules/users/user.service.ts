import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { UserStatus, Gender, UserRole } from "src/config/constants";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ErrorService } from '../../config/errors';
// import { FileUploadService } from "../media/file-upload.service";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    // private fileUploadService: FileUploadService
  ) { }

  async getOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException(ErrorService.USER_NOT_FOUND.message, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findAllUsers(query: any = {}, options: any = {}): Promise<User[]> {
    const excludedFields = ['-password', '-deletedAt', '-deletedBy', '-avatarUrl'];

    const users = await this.userModel.find(query, excludedFields.join(' '), options).exec();

    if (!users || users.length === 0) {
      throw new HttpException(ErrorService.USER_NOT_FOUND.message, HttpStatus.NOT_FOUND);
    }

    return users;
  }

  // Thêm users
  async create(createUserDto: CreateUserDto, createdBy: string): Promise<User> {
    // Kiểm tra các trường bắt buộc
    const requiredFields = ['email', 'phoneNumber', 'password', 'firstName', 'lastName', 'role'];
    const missingFields = requiredFields.filter(field => !createUserDto[field]);

    if (missingFields.length > 0) {
      throw new HttpException(`Missing required fields: ${missingFields.join(', ')}`, HttpStatus.BAD_REQUEST);
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
      status: UserStatus.ACTIVE,
      avatarUrl,
      createdBy,
    });

    const savedUser = await newUser.save();
    // Sử dụng toObject() và xóa trường password
    const result = savedUser.toObject();
    delete result.password;

    return result;
  }

  // Xóa mềm users
  // Xóa nhiều người dùng cùng lúc
  async batchMoveToTrash(ids: string[]): Promise<{ successMessages: string[], errorMessages: string[] }> {
    const successMessages: string[] = [];
    const errorMessages: string[] = [];

    // Nếu chỉ có 1 ID thì bỏ qua vòng lặp kiểm tra
    if (ids.length === 1) {
      const user = await this.userModel.findById(ids[0]).exec();
      if (!user) {
        throw new HttpException(ErrorService.USER_NOT_FOUND.message, HttpStatus.NOT_FOUND);
      }

       // Kiểm tra nếu user đã ở trạng thái suspended
       if (user.status === UserStatus.SUSPENDED) {
        throw new HttpException('User is already suspended', HttpStatus.BAD_REQUEST);
      }

      // Cập nhật trạng thái của người dùng
      user.status = UserStatus.SUSPENDED;
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
      if (user.status === UserStatus.SUSPENDED) {
        errorMessages.push(`User with ID ${id} cannot be moved to trash because status is APPENDING.`);
        continue; // Tiếp tục với người dùng tiếp theo
      }

      // Cập nhật trạng thái thành APPENDING
      user.status = UserStatus.SUSPENDED;
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
      { $set: { ...updateUserDto, updatedBy } }, // Cập nhật thông tin và ghi lại người cập nhật
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




}