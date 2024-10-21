import { IsEnum, IsMongoId, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { BenifitCode } from 'src/config/constants';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreatePatientDto {

  @IsOptional()
  @IsMongoId()
  primaryDoctor?: Types.ObjectId;

  @IsOptional()
  @IsString({ each: true })
  visitHistory?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(255)
  insuranceNumber?: string;

  @IsOptional()
  @IsEnum(BenifitCode)
  benifitId?: BenifitCode;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  emergencyContactName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  emergencyContactPhone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  emergencyContactRelationship?: string;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
