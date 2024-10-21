import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './modules/departments/schema/department.schema';
import { Doctor, DoctorSchema } from './modules/doctors/schema/doctor.schema';
import { User, UserSchema } from './modules/users/schema/user.schema';
import { Patient, PatientSchema } from './modules/patients/schema/patient.schema';
import { Appointment, AppointmentSchema } from './modules/appointments/schema/appointment.schema';

@Module({
  imports: [
    // Đăng ký các schema của Mongoose với các model Department, Doctor và User
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema }, // Đăng ký schema cho model Department
      { name: Doctor.name, schema: DoctorSchema },         // Đăng ký schema cho model Doctor
      { name: User.name, schema: UserSchema },
      { name: Patient.name, schema: PatientSchema },        // Đăng ký schema cho model User
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
  // Xuất MongooseModule để các module khác có thể sử dụng các schema đã đăng ký mà không cần đăng ký lại
  exports: [MongooseModule],
})
export class SharedModule { }
