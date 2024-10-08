import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserService } from "../users/user.service";
import * as bcrypt from 'bcrypt';
import { UserStatus, UserRole, Gender } from "src/config/constants";
import { User, UserDocument } from "../users/schema/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import ErrorService from "src/config/errors";

@Injectable()
export class AuthService {
    revokedTokens: string[] = [];
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel('RevokedToken') private revokedTokenModel: Model<any>,
    ) { }

    async signup(createUserDto: CreateUserDto): Promise<User> {
        // Kiểm tra xem email đã tồn tại chưa
        const requiredFields = ['email', 'phoneNumber', 'password', 'firstName', 'lastName'];
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

        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        
        const avatarUrl = createUserDto.avatarUrl || 'uploads/avt-user.jpg';
        // Tạo đối tượng người dùng mới
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
            role: UserRole.PATIENT, 
            gender: Gender.MALE, 
            status: UserStatus.ACTIVE, 
            avatarUrl
        });

        const savedUser = await newUser.save();
        // Sử dụng toObject() và xóa trường password
        const result = savedUser.toObject();
        delete result.password;
    
        return result;
    }

    async signin(user: Partial<CreateUserDto>) {
        const foundUser = await this.userService.getOne(user.email);
        if (foundUser) {
            const { password } = foundUser;
            if (await bcrypt.compare(user.password, password)) {
                const payload = {
                    email: user.email,
                    sub: (foundUser as any)._id.toString(),
                    role: foundUser.role
                };
                const token = this.jwtService.sign(payload);
                return {
                    access_token: token,
                    user: {
                        id: (foundUser as any)._id,
                        email: foundUser.email,
                        role: foundUser.role
                    }
                };
            }
        }
        throw new HttpException( ErrorService.USER_NOT_FOUND.message, HttpStatus.UNAUTHORIZED);
    }

    async changePassword(
        userId: any,
        oldPassword: string,
        newPassword: string,
        confirmNewPassword: string
    ): Promise<{ message: string }> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new HttpException(ErrorService.USER_NOT_FOUND.message, HttpStatus.NOT_FOUND);
        }
        
        // Check old password
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        
        if (!isOldPasswordValid) {
            throw new HttpException(ErrorService.PASSWORD_IS_NOT_TRUE.message, HttpStatus.BAD_REQUEST);
        }
    
        // Check new password confirmation
        if (newPassword !== confirmNewPassword) {
            throw new HttpException( ErrorService.PASSWORD_IS_NOT_MATCH.message, HttpStatus.BAD_REQUEST);
        }
    
        // Check new password requirements (you can adjust this regex as needed)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;
        if (!passwordRegex.test(newPassword)) {
            throw new HttpException('New password must contain lowercase, uppercase, and special characters', HttpStatus.BAD_REQUEST);
        }
    
        // Hash and save new password using the same method as in create function
        const hash = await bcrypt.hash(newPassword, 10);
    
        user.password = hash;
        user.updatedBy = userId; 
        await user.save();
    
        return { message: 'Password changed successfully' };
    }
    async logout(token: string) {
        await this.revokedTokenModel.create({ token });
        return { message: 'Logged out successfully' };
    }

    async isTokenRevoked(token: string): Promise<boolean> {
        const revokedToken = await this.revokedTokenModel.findOne({ token }).exec();
        return !!revokedToken;
    }
}