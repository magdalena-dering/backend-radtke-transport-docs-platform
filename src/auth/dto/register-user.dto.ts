import { UserAccountCredentialsDto } from './user-account-credentials.dto';
import { IsString } from 'class-validator'; // class-validator doesn't show errors

export class RegisterUserDto extends UserAccountCredentialsDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
