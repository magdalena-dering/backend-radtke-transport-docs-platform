import { PrismaService } from './../prisma/prisma.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log({ authCredentialsDto });
    try {
      const user = await this.prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      delete user.password;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const secret = this.config.get('JWT_SECRET');
      const payload = {
        sub: { userId: user.id },
        username,
      };
      const accessToken: string = await this.jwt.signAsync(payload, {
        expiresIn: 3600,
        secret: secret,
      });

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }
}
