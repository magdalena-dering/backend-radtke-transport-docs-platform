import { PrismaService } from '../../prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService, config: ConfigService) {
    super({
      secretOrKey: config.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { sub: number; username: string }) {
    const { username } = payload;
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
