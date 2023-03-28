import { PrismaService } from '../../prisma/prisma.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class UserCarOwnershipGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    const car = await this.prisma.car.findUnique({
      where: {
        numberPlate: params.numberPlate,
      },
    });
    delete user.password;

    if (!car || car.userId !== user.id) {
      throw new ForbiddenException('Access to resources denied');
    }
    return true;
  }
}
