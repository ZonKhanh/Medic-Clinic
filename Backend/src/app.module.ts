// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { DoctorModule } from './modules/doctors/doctor.module';
import { DepartmentModule } from './modules/departments/department.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './SharedModule';
import { PatientModule } from './modules/patients/patient.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/medic-clinic'),
    AuthModule,
    UserModule,
    DoctorModule,
    DepartmentModule,
    PatientModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}