import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Status, UserRole } from 'src/config/constants';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';


@Controller('/api/v1/department')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('add')
  async create(@Body() createDepartmentDto: CreateDepartmentDto, @Req() req) {
    const createdBy = req.user.userId;
    return this.departmentService.create(createDepartmentDto, createdBy);
  }

  @Get('get')
  findAll(@Query('status') status: Status) {
    return this.departmentService.findAll(status);
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto, @Req() req) {
    const updatedBy = req.user.userId;
    return this.departmentService.update(id, updateDepartmentDto, updatedBy);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @Body()updateDepartmentDto: UpdateDepartmentDto, @Req() req) {
    const deletedBy = req.user.userId;
    return this.departmentService.remove(id, updateDepartmentDto, deletedBy);
  }
}