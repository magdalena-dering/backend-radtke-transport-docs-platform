import { PrismaModule } from './../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { CarsService } from './car.service';
import { CarsController } from './car.controller';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
