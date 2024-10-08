import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @Post('/signin')
    async signin(@Body() user: Partial<CreateUserDto>) {
        return this.authService.signin(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/change-password')
    async changePassword(
        @Req() req,
        @Body() body: { oldPassword: any; newPassword: string; confirmNewPassword: string }
    ) {
        const userId = req.user.userId; // Extract user ID from JWT token
        return this.authService.changePassword(userId, body.oldPassword, body.newPassword, body.confirmNewPassword);
    }


    @Post('/logout')
    @UseGuards(JwtAuthGuard) // Sử dụng guard để bảo vệ route
    async logout(@Req() req) {
        const token = req.headers['authorization'].split(' ')[1]; // Lấy token từ header
        return this.authService.logout(token);
    }
}