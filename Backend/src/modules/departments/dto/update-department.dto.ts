import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsArray, IsMongoId, IsEnum } from 'class-validator';
import { User } from 'src/modules/users/schema/user.schema';
import { Department } from '../schema/department.schema';
import { Status } from 'src/config/constants';

export class UpdateDepartmentDto {

    @IsString()
    @IsOptional()
    @MaxLength(255)
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    description: string;

    @IsEnum(Status)
    @IsOptional()
    status?: Status;

    @IsNotEmpty()
    @IsMongoId()
    updatedBy?: string;

    @IsNotEmpty()
    @IsMongoId()
    deletedBy?: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    doctors?: string[];
}
