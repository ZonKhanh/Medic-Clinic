import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserService } from "../users/user.service";
import * as bcrypt from 'bcrypt';
import { UserStatus, UserRole, Gender } from "src/config/constants";
import { User, UserDocument } from "../users/schema/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AuthService {
    revokedTokens: string[] = [];
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async signup(createUserDto: CreateUserDto): Promise<User> {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
        if (existingUser) {
            throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
        }

        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        // Tạo đối tượng người dùng mới
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,  
            role: UserRole.PATIENT,    
            gender: Gender.MALE,       
            status: UserStatus.ACTIVE, 
        });

        // Lưu đối tượng người dùng vào cơ sở dữ liệu
        return newUser.save();  // Lưu trực tiếp vào MongoDB
    }

    // Hàm tạo người dùng
    async createUser(userData: CreateUserDto & { role: UserRole; gender: Gender; status: UserStatus }): Promise<User> {
        return this.userService.create(userData);
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
        throw new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED);
    }

    async logout(token: string) {
        this.revokedTokens.push(token);
        return { message: 'Logged out successfully' };
    }

    isTokenRevoked(token: string): boolean {
        return this.revokedTokens.includes(token);
    }
}