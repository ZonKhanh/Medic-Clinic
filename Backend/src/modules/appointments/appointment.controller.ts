import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { GetAppointmentsDto } from  './dto/get-appointments.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto, @Req() req) {
    return this.appointmentService.createAppointment(createAppointmentDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAppointments(@Query() query: GetAppointmentsDto, @Req() req) {
    return this.appointmentService.getAppointments(query, req.user);
  }

  @Get('available-slots')
  async getAvailableSlots(@Query('doctorId') doctorId: string, @Query('date') date: string) {
    return this.appointmentService.getAvailableSlots(doctorId, new Date(date));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateAppointment(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto, @Req() req) {
    return this.appointmentService.updateAppointment(id, updateAppointmentDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async cancelAppointment(@Param('id') id: string, @Req() req) {
    return this.appointmentService.cancelAppointment(id, req.user);
  }
}