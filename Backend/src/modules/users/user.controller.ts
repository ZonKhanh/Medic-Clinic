import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Query, UseInterceptors, UploadedFile, UseGuards, HttpException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from "./user.service";
import { UserRole } from '../../config/constants';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/role.guard";

@Controller('/api/v1/user')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('add')
    async addUser(@Body() createUserDto: CreateUserDto, @Req() req) {
        const createdBy = req.user.userId;
        return this.userService.create(createUserDto, createdBy);
    }

    @Get()
    async getAllUsers(@Query() query: any) {
        return this.userService.findAllUsers(query);
    }

    @Get('get/:id')
    async getUserById(@Param('id') id: string) {
        return this.userService.getById(id);
    }

    @Roles(UserRole.PATIENT)
    @Put('update/:id')
    async updateUser(@Req() req, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const updatedBy = req.user.userId;
        return this.userService.update(id, updateUserDto, updatedBy);
    }

    @Delete('batch-delete')
    async batchDeleteUsers(@Body('ids') ids: string[], @Req() req) {
        const deletedBy = req.user.userId;
        // Gọi hàm batchMoveToTrash với mảng ID
        return this.userService.batchMoveToTrash(ids, deletedBy);
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: string, @Req() req) {
        const deletedBy = req.user.userId;
        return this.userService.batchMoveToTrash([id], deletedBy);
    }

    @Roles(UserRole.PATIENT)
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

        const avatarUrl = file.path;
        return this.userService.updateAvatar(id, avatarUrl);
    }
}
