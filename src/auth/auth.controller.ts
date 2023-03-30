import { UserAccountCredentialsDto } from './dto/user-account-credentials.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() registerUserDto: UserDto) {
    return this.authService.signUp(registerUserDto);
  }

  @Post('/signin')
  signIn(@Body() userAccountCredentialsDto: UserAccountCredentialsDto) {
    return this.authService.signIn(userAccountCredentialsDto);
  }
}
