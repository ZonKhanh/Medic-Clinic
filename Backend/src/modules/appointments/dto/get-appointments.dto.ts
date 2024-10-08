import { IsDate, IsOptional } from 'class-validator';

export class GetAppointmentsDto {
  @IsDate()
  @IsOptional()
  date?: Date;
}