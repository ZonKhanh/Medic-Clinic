import { Prop } from "@nestjs/mongoose";
import {
    IsString,
    IsDefined,
    IsNotEmpty,
    IsBoolean,
    IsInt,
    IsArray,
    IsOptional,
    ArrayUnique,
    ArrayNotEmpty,
    IsEmail,
    IsIn,
  } from "class-validator";
import { Gender, UserRole, UserStatus } from "src/config/constants";
  
  export class CreateUserDto {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    phoneNumber: string;

    @IsOptional()
    address: string;

    @IsInt()
    @IsOptional()
    gender: Gender = Gender.MALE;

    @IsOptional() 
    dob: Date;  

    @IsString()
    @IsOptional()
    avatarUrl: string;

    @IsInt()
    role: UserRole;

    @IsInt()
    @IsOptional()
    status: number = UserStatus.ACTIVE;

    @IsOptional()
    @Prop([String])
    avatarUrls: string[];

}
  
  export class UsersDTO {
    @ArrayUnique()
    @ArrayNotEmpty()
    @IsArray()
    userIds: string[];
  }
  