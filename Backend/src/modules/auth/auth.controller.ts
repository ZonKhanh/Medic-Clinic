import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    async signup(@Res() response, @Body() createUserDto: CreateUserDto) {
        try {
            const newUser = await this.authService.signup(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                user: newUser,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: User not created!',
                error: 'Bad Request'
            });
        }
    }

    @Post('/signin')
    async signin(@Body() user: Partial<CreateUserDto>) {
        return this.authService.signin(user);
    }

    @Post('/logout')
    @UseGuards(JwtAuthGuard) // Sử dụng guard để bảo vệ route
    async logout(@Req() req) {
        const token = req.headers['authorization'].split(' ')[1]; // Lấy token từ header
        return this.authService.logout(token);
    }
}