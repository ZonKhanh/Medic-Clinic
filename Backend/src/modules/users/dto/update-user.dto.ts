import { IsString, IsOptional, IsEmail, IsEnum, MaxLength, MinLength, IsNotEmpty, IsMongoId } from "class-validator";
import { Gender, UserRole, Status } from "src/config/constants";
import { Type } from 'class-transformer';
import { Types } from "mongoose";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  lastName?: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(100)
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  password?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  address?: string;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsOptional()
  @Type(() => Date)
  dob?: Date;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  avatarUrl?: string;
  
  @IsNotEmpty()
  @IsMongoId()
  updatedBy?: Types.ObjectId;
  
}