import { PASSWORD_REGEX_PATTERN } from '../../../consts';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserAccountCredentialsDto {
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(PASSWORD_REGEX_PATTERN, { message: 'The password is to week.' })
  password: string;
}
