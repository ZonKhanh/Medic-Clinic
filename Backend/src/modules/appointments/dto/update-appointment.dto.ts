import { IsDate, IsString, IsOptional } from 'class-validator';

export class UpdateAppointmentDto {
  @IsDate()
  @IsOptional()
  dateTime?: Date;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsString()
  @IsOptional()
  status?: string;
}