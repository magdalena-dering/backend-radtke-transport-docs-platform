import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CarsService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAll(): Promise<Car[]> {
    return this.carsService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Car> {
    return this.carsService.getById(id);
  }

  @Patch('/:id')
  updateById(
    @Param('id') id: string,
    @Body() createCarDto: CreateCarDto,
  ): Promise<Car> {
    return this.carsService.updateById(id, createCarDto);
  }

  @Post()
  createTask(@Body() createCarDto: CreateCarDto): Promise<void> {
    return this.carsService.create(createCarDto);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string): Promise<void> {
    return this.carsService.deleteById(id);
  }
}
