import { IsNumber, IsOptional, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationSortDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;
  
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number = 10;
  
    @IsOptional()
    @IsString()
    sortBy?: string = 'createdAt';
  
    @IsOptional()
    @IsString()
    sortOrder?: 'asc' | 'desc' = 'desc';
  
    @IsOptional()
    @IsString()
    search?: string;
  }