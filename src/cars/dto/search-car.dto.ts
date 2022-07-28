import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchCarDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  search?: string;
}
