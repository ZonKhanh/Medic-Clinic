import { IsString, IsNotEmpty, IsOptional, IsEmail, IsEnum, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Gender, UserRole, Status } from "src/config/constants";
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string;

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
  gender?: Gender = Gender.MALE;

  @IsOptional()
  @Type(() => Date)
  dob?: Date;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsEnum(Status)
  @IsOptional()
  status: Status = Status.ACTIVE;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;


}