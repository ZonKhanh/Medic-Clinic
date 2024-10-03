import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../config/constants';  // Enum vai trò người dùng

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Lấy danh sách các vai trò yêu cầu từ metadata (do decorator @Roles gán)
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;  // Nếu không có yêu cầu về vai trò, cho phép truy cập
    }

    // Lấy thông tin người dùng từ request (do JwtStrategy đã giải mã token)
    const { user } = context.switchToHttp().getRequest();
    
    // Kiểm tra xem vai trò của người dùng có nằm trong danh sách requiredRoles hay không
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      // Nếu người dùng không có vai trò phù hợp, ném lỗi 403 Forbidden
      throw new HttpException('You do not have permission to access this resource', HttpStatus.FORBIDDEN);
    }

    return hasRole;  // Trả về true nếu người dùng có vai trò hợp lệ
  }
}
