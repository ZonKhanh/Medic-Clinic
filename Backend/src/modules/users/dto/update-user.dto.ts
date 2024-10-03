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
  
  export class UpdateUserDto {
  
    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    password: string;

    @IsOptional()
    phoneNumber: string;

    @IsOptional()
    address: string;

    @IsInt()
    @IsOptional()
    gender: Gender;

    @IsOptional() 
    dob: Date;  

    @IsInt()
    @IsOptional()
    role: UserRole;

    @IsInt()
    @IsOptional()
    status: UserStatus;

    @IsOptional()
    @Prop([String])
    avatarUrls: string[];

}
  
  