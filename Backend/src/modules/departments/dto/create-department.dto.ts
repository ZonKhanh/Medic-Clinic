import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, MaxLength, IsArray, IsMongoId, IsOptional, IsEnum } from 'class-validator';
import { User } from 'src/modules/users/schema/user.schema';
import { Department } from '../schema/department.schema';
import { Status } from 'src/config/constants';
import { Types } from 'mongoose';

export class CreateDepartmentDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    description: string;

    @IsEnum(Status)
    @IsOptional()
    status: Status = Status.ACTIVE;

    @IsMongoId()
    @IsOptional()
    createdBy?: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    doctors?: Types.ObjectId[];
}
