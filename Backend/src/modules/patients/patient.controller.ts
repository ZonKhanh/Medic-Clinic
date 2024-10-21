import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Put, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { UserRole } from 'src/config/constants';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { PaginationSortDto } from '../PaginationSort.dto ';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.RECEPTIONIST, UserRole.PATIENT)
@Controller('/api/v1/patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('add')
  async createPatient(@Body() createPatientDto: CreatePatientDto, @Req() req) {
    const createdBy = req.user.userId
    return this.patientService.create(createPatientDto, createdBy);
  }

  @Get('get')
  async getAllPatients(@Query() paginationSortDto: PaginationSortDto) {
    return this.patientService.getAllPatients({}, paginationSortDto);
  }
  

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Put('update/:id')
  async updatePatient(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto, @Req() req) {
    const updatedBy = req.user.userId
    return this.patientService.update(id, updatePatientDto, updatedBy);
  }

  @Delete('delete/:id')
  deletePatient(@Param('id') id: string, @Req() req) {
    const deletedBy = req.user.userId;
    return this.patientService.remove(id, deletedBy);
  }

  @Delete('batch-delete')
  batchDeletePatients(@Body('ids') ids: string[], @Req() req) {
    const deletedBy = req.user.userId;
    return this.patientService.remove(ids, deletedBy);
  }
}
