import { forwardRef, Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { AuthModule } from '../auth/auth.module';
import { DoctorModule } from '../doctors/doctor.module';
import { SharedModule } from 'src/SharedModule';

@Module({
  imports: [
    SharedModule,
    forwardRef(() => AuthModule),
    forwardRef(() => DoctorModule),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService, ]
})
export class DepartmentModule {}