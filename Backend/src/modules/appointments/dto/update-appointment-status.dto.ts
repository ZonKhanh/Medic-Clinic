import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

export class UpdateAppointmentStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}