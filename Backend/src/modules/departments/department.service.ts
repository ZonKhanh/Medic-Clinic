import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department, DepartmentDocument } from './schema/department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Status } from 'src/config/constants';
import ErrorService from 'src/config/errors';
import { nowTime } from 'src/utils/timeUtil';

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
            createdBy, // Gán createdBy từ DTO
        });
        return createdDepartment.save();
    }


    async findAll(status?: Status): Promise<Department[]> {
        const query = status ? { status } : {};
        return this.departmentModel.find(query).populate('doctors').exec();
    }

    async findOne(id: string): Promise<Department> {
        const department = await this.departmentModel.findById(id).populate('doctors').exec();
        if (!department) {
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
                    updatedBy,
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
                    deletedBy, 
                    deletedAt: nowTime, 
                    status: Status.SUSPENDED,
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