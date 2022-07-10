import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { CarsService } from './car.service';
import { CarsController } from './car.controller';
import { Car } from './entities/car.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Car])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
