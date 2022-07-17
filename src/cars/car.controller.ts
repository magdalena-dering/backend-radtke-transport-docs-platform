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
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/get-user-decorator';
import { CarsService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';

@Controller('cars')
@UseGuards(AuthGuard())
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAll(@GetUser() user: User): Promise<Car[]> {
    return this.carsService.getAll(user);
  }

  @Get('/:id')
  getById(@Param('id') id: string, @GetUser() user: User): Promise<Car> {
    return this.carsService.getById(id, user);
  }

  @Patch('/:id')
  updateById(
    @Param('id') id: string,
    @Body() createCarDto: CreateCarDto,
    @GetUser() user: User,
  ): Promise<Car> {
    return this.carsService.updateById(id, createCarDto, user);
  }

  @Post()
  create(
    @Body() createCarDto: CreateCarDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.carsService.create(createCarDto, user);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.carsService.deleteById(id, user);
  }
}
