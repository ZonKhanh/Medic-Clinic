import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { DoctorModule } from '../doctors/doctor.module';
import { PatientModule } from '../patients/patient.module';
import { DepartmentModule } from '../departments/department.module';
import { SharedModule } from 'src/SharedModule';

@Module({
  imports: [
    SharedModule,
    DoctorModule,
    PatientModule,
    DepartmentModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentModule {}