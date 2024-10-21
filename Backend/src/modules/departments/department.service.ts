import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Department, DepartmentDocument } from './schema/department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Status } from 'src/config/constants';
import ErrorService from 'src/config/errors';
import { nowTime } from 'src/utils/timeUtil';
import { PaginationSortDto } from '../PaginationSort.dto ';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>
    ) { }

    async create(createDepartmentDto: CreateDepartmentDto, createdBy: string): Promise<Department> {

        const existingTitle = await this.departmentModel.findOne({ title: createDepartmentDto.title }).exec();
        if (existingTitle) {
            throw new HttpException(ErrorService.ERR_TITLE_EXISTED.message, HttpStatus.BAD_REQUEST);
        }

        const createdDepartment = new this.departmentModel({
            ...createDepartmentDto,
            createdBy: new Types.ObjectId(createdBy)
        });
        return createdDepartment.save();
    }


    async getAllDepartments(
        query: any = {}, 
        paginationSortDto: PaginationSortDto
      ): Promise<{ departments: (Department & { doctorCount: number })[], total: number, page: number, limit: number }> {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', search } = paginationSortDto;
        const skip = (page - 1) * limit;
      
        const sortOptions = { [sortBy]: sortOrder };
      
        query.status = Status.ACTIVE;
      
        if (search) {
          const searchRegex = new RegExp(search, 'i');
          query.$or = [
            { title: searchRegex },
            { description: searchRegex }
          ];
        }
      
        const [departments, total] = await Promise.all([
          this.departmentModel.find(query)
            .select('title description doctors')
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .lean(),
          this.departmentModel.countDocuments(query)
        ]);
      
        if (!departments || departments.length === 0) {
          throw new HttpException('Không tìm thấy phòng ban', HttpStatus.NOT_FOUND);
        }
      
        // Thêm trường doctorCount vào mỗi department
        const departmentsWithCount = departments.map(dept => ({
          ...dept,
          doctorCount: dept.doctors.length
        }));
      
        return {
          departments: departmentsWithCount,
          total,
          page: Number(page),
          limit: Number(limit)
        };
      }
      

      async findOne(id: string): Promise<Department> {

        const department = await this.departmentModel.findOne({ _id: id, status: Status.ACTIVE })
          .populate('doctors')
          .exec();
      
        if (!department) {
          // Ném ra lỗi nếu không tìm thấy phòng ban hoặc phòng ban không active
          throw new HttpException(ErrorService.DEPARTMENT_NOT_FOUND.message, HttpStatus.BAD_REQUEST);
        }
      
        return department;
      }
      

    async update(id: string, updateDepartmentDto: UpdateDepartmentDto, updatedBy: string): Promise<Department> {

        const existingTitle = await this.departmentModel.findOne({ title: updateDepartmentDto.title }).exec();
        if (existingTitle) {
            throw new HttpException(ErrorService.ERR_TITLE_EXISTED.message, HttpStatus.BAD_REQUEST);
        }

        const updatedDepartment = await this.departmentModel
            .findByIdAndUpdate(
                id,
                {
                    ...updateDepartmentDto,
                    updatedBy: new Types.ObjectId(updatedBy)
                },
                { new: true }
            )
            .populate('doctors')
            .exec();
        if (!updatedDepartment) {
            throw new HttpException(ErrorService.DEPARTMENT_NOT_FOUND.message, HttpStatus.BAD_REQUEST);
        }
        return updatedDepartment;
    }

    async remove(id: string, updateDepartmentDto: UpdateDepartmentDto, deletedBy: string): Promise<Department> {
        const deletedDepartment = await this.departmentModel
            .findByIdAndUpdate(
                id,
                {
                    ...updateDepartmentDto, 
                    deletedBy: new Types.ObjectId(deletedBy),
                    deletedAt: nowTime, 
                    status: Status.SUSPENDED
                },
                { new: true }
            )
            .exec();
        if (!deletedDepartment) {
            throw new HttpException(ErrorService.DEPARTMENT_NOT_FOUND.message, HttpStatus.BAD_REQUEST);
        }
        return deletedDepartment;
    }

}