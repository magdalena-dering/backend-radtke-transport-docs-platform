import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  registration_number: string;

  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  distance: string;

  @IsString()
  note: string;
}
