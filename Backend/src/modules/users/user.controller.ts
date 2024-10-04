import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Query, UseInterceptors, UploadedFile, UseGuards, HttpException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from "./user.service";
import { UserRole } from '../../config/constants';
import { diskStorage } from 'multer';
import { extname } from 'path';
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
    @Post('add')
    async addUser(@Body() createUserDto: CreateUserDto, @Req() req) {
      const createdBy = req.user.userId; // Lấy ID của người dùng hiện tại từ request
      return this.userService.create(createUserDto, createdBy);
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
    async updateUser(@Req() req, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const updateBy = req.user.id; // Lấy userId của người dùng hiện tại
        return this.userService.update(id, updateUserDto, updateBy);
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
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                const filename = `${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return callback(new Error('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 1024 * 1024 * 5 // 5MB
        }
    }))
    async updateAvatar(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
        }

        try {
            const avatarUrl = file.path;
            const updatedUser = await this.userService.updateAvatar(id, avatarUrl);
            return {
                statusCode: HttpStatus.OK,
                message: 'Avatar updated successfully',
                user: updatedUser
            };
        } catch (error) {
            console.error('Error updating avatar:', error);
            throw new HttpException('Error updating avatar', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}