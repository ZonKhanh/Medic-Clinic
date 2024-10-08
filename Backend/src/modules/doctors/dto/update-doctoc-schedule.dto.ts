import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateDoctorScheduleDto {
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}