import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';
import { UpdateDoctorScheduleDto } from './dto/update-doctoc-schedule.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'src/config/constants';


@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('schedule')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  async createSchedule(@Body() createScheduleDto: CreateDoctorScheduleDto, @Req() req) {
    return this.doctorService.createSchedule(createScheduleDto, req.user);
  }

  @Get('schedule')
  @UseGuards(JwtAuthGuard)
  async getDoctorSchedule(@Query('doctorId') doctorId: string, @Query('date') date: string) {
    return this.doctorService.getDoctorSchedule(doctorId, new Date(date));
  }

  @Put('schedule/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  async updateSchedule(@Param('id') id: string, @Body() updateScheduleDto: UpdateDoctorScheduleDto, @Req() req) {
    return this.doctorService.updateSchedule(id, updateScheduleDto, req.user);
  }

  @Delete('schedule/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  async deleteSchedule(@Param('id') id: string, @Req() req) {
    return this.doctorService.deleteSchedule(id, req.user);
  }
}