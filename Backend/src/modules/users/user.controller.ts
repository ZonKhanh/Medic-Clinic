import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Query, UseInterceptors, UploadedFile, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from "./user.service";
import { UserRole } from '../../config/constants';
import { diskStorage } from 'multer';
import  path from 'path';
import { UPLOAD } from "../../config/constants";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/role.guard";

@Controller('/api/v1/user') // Áp dụng cả JwtAuthGuard và RolesGuard cho toàn bộ controller
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
        // private jwtService: JwtService
    ) { }

    @Roles(UserRole.ADMIN)
    @Post('add') // Đánh dấu phương thức này là một route handler cho HTTP POST request đến đường dẫn '/add
    async addUser(@Body() createUserDto: CreateUserDto) {
        // Phương thức xử lý POST request với dữ liệu từ body
        return this.userService.create(createUserDto); // Gọi phương thức create trong userService để tạo người dùng mới
    }

    @Get('/getuser')
    async getUserByEmail(@Res() response, @Query('email') email: string) {
        try {
            const user = await this.userService.getOne(email);
            return response.status(HttpStatus.OK).json({
                message: 'User found successfully',
                user,
            });
        } catch (err) {
            return response.status(HttpStatus.NOT_FOUND).json({
                statusCode: 404,
                message: 'Error: User not found!',
                error: 'Not Found'
            });
        }
    }

    @Get('get/:id')
    async getUserById(@Res() response, @Param('id') id: string) {
        try {
            const user = await this.userService.getById(id);
            return response.status(HttpStatus.OK).json({
                message: 'User found successfully',
                user,
            });
        } catch (err) {
            return response.status(HttpStatus.NOT_FOUND).json({
                statusCode: 404,
                message: 'Error: User not found!',
                error: 'Not Found'
            });
        }
    }

    @Roles(UserRole.ADMIN)
    @Put('update/:id')
    async updateUser(@Res() response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            const user = await this.userService.update(id, updateUserDto);
            return response.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                user,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not updated!',
                error: 'Bad Request'
            });
        }
    }

    @Roles(UserRole.ADMIN)
    @Delete('delete/:id')
    async deleteUser(@Res() response, @Param('id') id: string) {
        try {
            const user = await this.userService.delete(id);
            return response.status(HttpStatus.OK).json({
                message: 'User has been deleted',
                user,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not deleted!',
                error: 'Bad Request'
            });
        }
    }

    @Roles(UserRole.ADMIN)
    @Put('update-avatar/:id')
    @UseInterceptors(FileInterceptor('avatar', {

        fileFilter: (req, file, cb) => {

            console.log(file); // Ghi log đối tượng file
            if (!file) {
                return cb(new Error('Không có file nào được cung cấp'), false);
            }
        
            // if (UPLOAD.EXTENSION.includes(path.extname(file.originalname).toLowerCase())) {
            //     cb(null, true);
            // } else {
            //     cb(new Error('Loại file không hợp lệ'), false);
            // }
        },
        
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB
        }
    }))
    async updateAvatar(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        const updatedUser = await this.userService.updateAvatar(id, file);
        return {
            message: 'Avatar updated successfully',
            user: updatedUser
        };
    }
}