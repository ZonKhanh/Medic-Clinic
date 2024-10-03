import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { UserStatus, Gender, UserRole } from "src/config/constants";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FileUploadService } from "../media/file-upload.service";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileUploadService: FileUploadService
) {}

    async getOne(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }

    async getById(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async delete(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return deletedUser;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(createUserDto.password, salt);
        const newUser = new this.userModel({
          ...createUserDto,
          password: hash,
          status: UserStatus.ACTIVE, 
          role: UserRole.ADMIN,
        });
        return newUser.save();
      }

      async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(
          id,
          { $set: updateUserDto },
          { new: true, runValidators: true }
        ).exec();
    
        if (!updatedUser) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    
        return updatedUser;
      }

      async updateAvatar(id: string, file: Express.Multer.File): Promise<User> {
        const avatarUrls = await this.fileUploadService.uploadAndResizeAvatar(file);
    
        const updatedUser = await this.userModel.findByIdAndUpdate(
          id,
          { $set: { avatarUrls } },
          { new: true, runValidators: true }
        ).exec();
    
        if (!updatedUser) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    
        return updatedUser;
      }
}