import { IsDate, IsString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsDate()
  @IsNotEmpty()
  dateTime: Date;

  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}