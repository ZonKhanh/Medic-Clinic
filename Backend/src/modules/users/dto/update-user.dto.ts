import { IsString, IsOptional, IsEmail, IsEnum, MaxLength, MinLength, IsNotEmpty } from "class-validator";
import { Gender, UserRole, Status } from "src/config/constants";
import { Type } from 'class-transformer';

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
  // @MinLength(8)
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

  @IsString()
  @IsNotEmpty()
  updatedBy?: string;
  
}