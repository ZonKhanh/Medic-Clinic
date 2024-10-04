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

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new HttpException(ErrorService.USER_NOT_FOUND.message, HttpStatus.NOT_FOUND);
    }
    return deletedUser;
  }

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
      createdBy, // Thêm trường createdBy
    });

    const savedUser = await newUser.save();
    // Sử dụng toObject() và xóa trường password
    const result = savedUser.toObject();
    delete result.password;

    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto, updatedBy: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        $set: { ...updateUserDto, updatedBy }, // Ghi lại người cập nhật
      },
      { new: true, runValidators: true },
    ).exec();

    if (!updatedUser) {
      throw new HttpException(ErrorService.USER_ERR_EMAIL_EXISTED.message, HttpStatus.NOT_FOUND);
    }

    const savedUser = await updatedUser.save();
    // Sử dụng toObject() và xóa trường password
    const result = savedUser.toObject();
    delete result.password;

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