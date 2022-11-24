import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from './../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { CarsService } from './car.service';
import { CarsController } from './car.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [CarsController],
  providers: [CarsService, AuthService, JwtService],
})
export class CarsModule {}
