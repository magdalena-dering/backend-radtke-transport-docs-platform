import { UserAccountCredentialsDto } from './dto/user-account-credentials.dto';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    try {
      await this.authService.signUp(registerUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Credentials taken',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Post('/signin')
  signIn(@Body() userAccountCredentialsDto: UserAccountCredentialsDto) {
    return this.authService.signIn(userAccountCredentialsDto);
  }
}
