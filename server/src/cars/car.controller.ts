import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserCarOwnershipGuard } from 'src/auth/guard/user-car-ownership.guard';

import { CarsService } from './car.service';
import { CarDto } from './dto';

@Controller('cars')
@UseGuards(AuthGuard('jwt'))
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getCars(@GetUser('id') userId: number) {
    return this.carsService.getCars(userId);
  }

  @Get('/:numberPlate')
  getCarByNumberPlate(
    @GetUser('id') userId: number,
    @Param('numberPlate') numberPlate: string,
  ) {
    return this.carsService.getCarByNumberPlate(userId, numberPlate);
  }

  @Post()
  createCar(@GetUser('id') userId: number, @Body() carDto: CarDto) {
    return this.carsService.createCar(userId, carDto);
  }

  @UseGuards(UserCarOwnershipGuard)
  @Patch('/:numberPlate')
  editCarByNumberPlate(
    @Param('numberPlate') numberPlate: string,
    @Body() carDto: CarDto,
  ) {
    return this.carsService.editCarByNumberPlate(numberPlate, carDto);
  }

  @UseGuards(UserCarOwnershipGuard)
  @Delete('/:numberPlate')
  deleteCarByNumberPlate(@Param('numberPlate') numberPlate: string) {
    return this.carsService.deleteCarByNumberPlate(numberPlate);
  }
}
