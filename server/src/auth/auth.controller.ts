import { UserAccountCredentialsDto } from './dto/user-account-credentials.dto';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() registerUserDto: UserDto) {
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
