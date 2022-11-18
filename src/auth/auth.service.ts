import { PrismaService } from './../prisma/prisma.service';
import { UserAccountCredentialsDto } from './dto/user-account-credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './../dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signUp(registerUserDto: UserDto) {
    const { email, password, firstName, lastName } = registerUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    delete user.password;

    return user;
  }

  async signIn(
    userAccountCredentialsDto: UserAccountCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = userAccountCredentialsDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        sub: { userId: user.id },
        email,
      };
      const accessToken: string = this.jwt.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }
}
