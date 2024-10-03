import { Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private authService: AuthService) {
        super();
    }

    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        const token = context.switchToHttp().getRequest().headers['authorization']?.split(' ')[1];
        console.log('Token after decoding:', token); // In token ra console
        if (this.authService.isTokenRevoked(token)) {
            throw new HttpException('Token has been revoked', HttpStatus.UNAUTHORIZED);
        }

        return super.handleRequest(err, user, info, context);
    }
}

