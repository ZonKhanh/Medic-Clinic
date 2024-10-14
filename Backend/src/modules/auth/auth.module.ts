// src/auth/auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { JwtStrategy } from './token/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/role.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schema/user.schema';
import { RevokedTokenSchema } from './token/RevokedToken.schema';
import { Department, DepartmentSchema } from '../departments/schema/department.schema';


@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: '95b2be0306317619b015a00b5acf01cab2833a91c4b69eed794d492aaf0bf4c9e7f0395c58ebc87ce5d64b488a024d975d8ad7b80c07b15e16fa9b9d74a53112',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      // { name: Department.name, schema: DepartmentSchema },
      { name: 'RevokedToken', schema: RevokedTokenSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
  exports: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}

