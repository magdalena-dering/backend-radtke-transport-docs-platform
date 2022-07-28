import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  numberPlate: string;

  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  distance: string;

  @IsString()
  @IsOptional()
  note: string;
}
