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

import { CarsService } from './car.service';
import { CarDto } from './dto';

@Controller('cars')
@UseGuards(AuthGuard())
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getCars(@GetUser('id') userId: number) {
    return this.carsService.getCars(userId);
  }

  @Get('/:numberPlate')
  getCarByNumberPlate(
    @GetUser() userId: number,
    @Param('numberPlate') numberPlate: string,
  ) {
    return this.carsService.getCarByNumberPlate(userId, numberPlate);
  }

  @Post()
  createCar(@GetUser() userId: number, @Body() carDto: CarDto) {
    return this.carsService.createCar(userId, carDto);
  }

  @Patch('/:numberPlate')
  editCarByNumberPlate(
    @GetUser() userId: number,
    @Param('numberPlate') numberPlate: string,
    @Body() carDto: CarDto,
  ) {
    return this.carsService.editCarByNumberPlate(userId, numberPlate, carDto);
  }

  @Delete('/:numberPlate')
  deleteCarByNumberPlate(
    @GetUser() userId: number,
    @Param('numberPlate') numberPlate: string,
  ) {
    return this.carsService.deleteCarByNumberPlate(userId, numberPlate);
  }
}
