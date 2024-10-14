// doctor.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { UserModule } from '../users/user.module';
import { AuthModule } from '../auth/auth.module';
import { DepartmentModule } from '../departments/department.module';
import { SharedModule } from 'src/SharedModule';

@Module({
  imports: [
    SharedModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => DepartmentModule),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}