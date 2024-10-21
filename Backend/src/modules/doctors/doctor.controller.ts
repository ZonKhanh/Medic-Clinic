// doctor.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
// import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UserRole } from 'src/config/constants';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PaginationSortDto } from '../PaginationSort.dto ';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api/v1/doctor')
@Roles(UserRole.ADMIN, UserRole.DOCTOR)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Post('add')
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto, @Req() req) {
    const createdBy = req.user.userId;
    return this.doctorService.create(createDoctorDto, createdBy);
  }

  @Put('update/:id')
  async updateDoctor(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto, @Req() req) {
    const updatedBy = req.user.userId;
    return this.doctorService.update(id, updateDoctorDto, updatedBy);
  }

  @Delete('delete/:id')
  async deleteDoctor(@Param('id') id: string, @Req() req) {
    const deletedBy = req.user.userId;
    return this.doctorService.remove(id, deletedBy);
  }

  @Delete('batch-delete')
  async batchDeleteDoctors(@Body('ids') ids: string[], @Req() req) {
    const deletedBy = req.user.userId;
    return this.doctorService.remove(ids, deletedBy);
  }

  @Get('get')
  async getAllDoctors(@Query() paginationSortDto: PaginationSortDto) {
    return this.doctorService.getAllDoctors(paginationSortDto);
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }


}