// create-doctor.dto.ts
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsEnum, IsMongoId, IsOptional, ValidateNested, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { AcademicDegree } from 'src/config/constants';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

export class UpdateDoctorDto {

    @IsOptional()
    @IsString()
    specialization: string;

    @IsOptional()
    @IsNumber()
    experience: number;

    @IsOptional()
    @IsString()
    bio: string;

    @IsOptional()
    @IsEnum(AcademicDegree)
    education: AcademicDegree;

    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateUserDto)
    user: UpdateUserDto;

    @IsOptional()
    @IsMongoId()
    department: Types.ObjectId;

}