import { CreateUserDto } from '../../users/dto/create-user.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateDoctorUserDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsString()
  @IsNotEmpty()
  licenseNumber: string;
}