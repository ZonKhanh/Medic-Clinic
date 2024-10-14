import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DoctorModule } from '../doctors/doctor.module'
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from 'src/SharedModule';

@Module({
  imports: [
    SharedModule,
    forwardRef(() => DoctorModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}