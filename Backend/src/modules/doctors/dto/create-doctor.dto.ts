// create-doctor.dto.ts
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsEnum, IsMongoId, IsOptional, ValidateNested, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { AcademicDegree } from 'src/config/constants';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreateDoctorDto {

  @IsNotEmpty()
  @IsString()
  specialization: string;

  @IsOptional()
  @IsNumber()
  experience: number;

  @IsOptional()
  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsEnum(AcademicDegree)
  education: AcademicDegree;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
  
  @IsNotEmpty()
  @IsMongoId()
  department: Types.ObjectId;
}