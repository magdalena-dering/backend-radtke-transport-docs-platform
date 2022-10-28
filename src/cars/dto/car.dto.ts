import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  numberPlate: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  distance: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  user: string;
}
