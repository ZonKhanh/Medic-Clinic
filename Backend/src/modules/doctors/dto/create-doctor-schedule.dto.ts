import { IsDate, IsArray, IsNumber, ArrayMinSize, ArrayMaxSize, Min, Max } from 'class-validator';

export class CreateDoctorScheduleDto {
  @IsDate()
  date: Date;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(9)
  @IsNumber({}, { each: true })
  @Min(8, { each: true })
  @Max(17, { each: true })
  hours: number[];
}