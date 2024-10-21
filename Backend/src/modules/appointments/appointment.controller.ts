import { Controller, Post, Body, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Get('doctor/:doctorId')
  async getDoctorAppointments(@Param('doctorId') doctorId: string) {
    return this.appointmentService.getDoctorAppointments(doctorId, new Date());
  }

  @Get('patient/:patientId')
  async getPatientAppointments(@Param('patientId') patientId: string) {
    return this.appointmentService.getPatientAppointments(patientId);
  }

  @Patch(':id/status')
  async updateAppointmentStatus(
    @Param('id') id: string,
    @Body() updateAppointmentStatusDto: UpdateAppointmentStatusDto,
  ) {
    return this.appointmentService.updateAppointmentStatus(id, updateAppointmentStatusDto.status);
  }

  @Get('available/:departmentId')
  async getAvailableAppointments(@Param('departmentId') departmentId: string) {
    return this.appointmentService.getAvailableAppointments(departmentId);
  }
}