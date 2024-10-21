import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient, PatientDocument } from './schema/patient.schema';
import { User } from '../users/schema/user.schema';
import { UserService } from '../users/user.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { Status } from 'src/config/constants';
import { Doctor } from '../doctors/schema/doctor.schema';
import { PaginationSortDto } from '../PaginationSort.dto ';

@Injectable()
export class PatientService {
    constructor(
        @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    async create(createPatientDto: CreatePatientDto, createdBy: string): Promise<Patient> {
        const { user, ...patientData } = createPatientDto;

        const createdUser = await this.userService.create(user, createdBy);

        const newPatient = new this.patientModel({
            ...patientData,
            user: (createdUser as any)._id,
        });
        const savedPatient = await newPatient.save();

        const populatedPatient = await this.patientModel.findById(savedPatient._id)
            .populate({
                path: 'user',
                select: '-password', // Loại bỏ trường password
            })
            .exec();

        return populatedPatient;
    }

    async getAllPatients(
        query: any = {},
        paginationSortDto: PaginationSortDto
    ): Promise<{ patients: Patient[], total: number, page: number, limit: number }> {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', search } = paginationSortDto;
        const skip = (page - 1) * limit;

        const searchQuery = search ? {
            $or: [
                ...['email', 'firstName', 'lastName', 'phoneNumber', 'address', 'nationalId'].map(field => ({ [`user.${field}`]: new RegExp(search, 'i') })),
                { insuranceNumber: new RegExp(search, 'i') },
                { emergencyContactName: new RegExp(search, 'i') },
                { emergencyContactPhone: new RegExp(search, 'i') },
                { emergencyContactRelationship: new RegExp(search, 'i') },
            ]
        } : {};

        const finalQuery = {
            ...query,
            ...searchQuery,

        };

        const [patients, total] = await Promise.all([
            this.patientModel.find(finalQuery)
                .populate({
                    path: 'user',
                    select: 'lastName firstName phoneNumber status email',
                    match: { status: Status.ACTIVE }
                })
                .sort({ [sortBy]: sortOrder })
                .skip(skip)
                .limit(limit)
                .lean(),
            this.patientModel.countDocuments({
                ...finalQuery,
                user: { $in: (await this.userModel.find({ status: Status.ACTIVE }).select('_id')).map(u => u._id) }
            })
        ]);

        const activePatients = patients.filter(patient => patient.user);

        if (patients.length === 0) {
            throw new HttpException('Không tìm thấy bệnh nhân có user hợp lệ', HttpStatus.NOT_FOUND);
        }

        return { patients: activePatients, total, page: Number(page), limit: Number(limit) };
    }


    async findOne(id: string): Promise<Patient> {
        const patient = await this.patientModel.findOne({ id, status: Status.ACTIVE })
            .populate({
                path: 'user',
                select: '-password', // Loại bỏ trường password
            })
            .exec();

        if (!patient) {
            throw new NotFoundException(`Patient with ID ${id} not found`);
        }
        return patient;
    }

    async update(id: string, updatePatientDto: UpdatePatientDto, updatedBy: string): Promise<Patient> {
        // Kiểm tra nếu không có trường nào trong updatePatientDto
        if (!updatePatientDto || Object.keys(updatePatientDto).length === 0) {
            throw new HttpException('No data fields provided for update', HttpStatus.BAD_REQUEST);
        }

        const existingPatient = await this.patientModel.findById(id).exec();
        if (!existingPatient) {
            throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
        }

        const { user, ...patientData } = updatePatientDto;

        // Luôn cập nhật thời gian updatedAt cho user, kể cả khi không có thay đổi dữ liệu của user
        const userToUpdate = updatePatientDto.user || existingPatient.user; // Nếu không có `user` trong DTO, lấy từ patient hiện tại
        try {
            const updateUserDto = {
                ...userToUpdate,
                updatedAt: new Date(), // Luôn cập nhật thời gian updatedAt
            };

            await this.userService.update(existingPatient.user.toString(), updateUserDto as UpdateUserDto, updatedBy);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Failed to update user information', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // Cập nhật thông tin patient
        const updatedPatient = await this.patientModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...patientData
                }
            },
            { new: true, runValidators: true }
        ).exec();

        if (!updatedPatient) {
            throw new HttpException('Failed to update patient', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // Populate all related fields
        const populatedPatient = await this.patientModel.findById(updatedPatient._id)
            .populate({
                path: 'user',
                select: '-password', // Loại bỏ trường password
            })
            .exec();

        return populatedPatient;

    }

    async remove(ids: string | string[], deletedBy: string): Promise<{ successMessages: string[], errorMessages: string[] }> {
        // Chuyển đổi id thành mảng nếu nó là string
        const idArray = Array.isArray(ids) ? ids : [ids];

        // Tìm kiếm và populate user cho từng patient
        const patients = await this.patientModel.find({ _id: { $in: idArray } })
            .populate('user') // Giả sử trường người dùng trong patient là 'user'
            .exec();

        // Lấy id của user từ từng patient và chuyển đổi thành string
        const userIds = patients.map(patient => patient.user?._id.toString()).filter(Boolean); // Chuyển đổi ObjectId thành string và lọc bỏ giá trị undefined

        // Gọi hàm batchMoveToTrash từ userService
        return this.userService.batchMoveToTrash(userIds, deletedBy);
    }


}
