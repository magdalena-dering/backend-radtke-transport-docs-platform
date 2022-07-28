import { SearchCarDto } from './dto/search-car.dto';
import { ERROR_DUPLICATE_KEY_VALUE } from './../../consts';
import { User } from './../auth/entities/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carsRepository: Repository<Car>) {}

  async getAll(user: User, searchCarDto: SearchCarDto): Promise<Car[]> {
    const query = this.carsRepository.createQueryBuilder('car').where({ user });
    const { search } = searchCarDto;

    if (search) {
      query.andWhere(
        '(LOWER(car.name) LIKE LOWER(:search) OR LOWER(car.numberPlate) LIKE LOWER(:search) OR LOWER(car.date) LIKE LOWER(:search) OR LOWER(car.distance) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try {
      const cars = await query.getMany();
      return cars;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getByNumberPlate(numberPlate: string, user: User): Promise<Car> {
    const car = await this.carsRepository.findOne({
      where: { numberPlate, user },
    });
    if (!car) {
      throw new NotFoundException(
        `Car with number plate ${numberPlate} not found.`,
      );
    }
    return car;
  }

  async create(createCarDto: CreateCarDto, user: User): Promise<void> {
    const car = this.carsRepository.create({ ...createCarDto, user });
    const { numberPlate } = createCarDto;
    try {
      await this.carsRepository.save(car);
    } catch (error) {
      if (error.code === ERROR_DUPLICATE_KEY_VALUE) {
        throw new ConflictException(
          `The number plate: ${numberPlate} already exists.`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateByNumberPlate(
    numberPlate: string,
    createCarDto: CreateCarDto,
    user: User,
  ): Promise<Car> {
    const car = await this.getByNumberPlate(numberPlate, user);
    const changedCar = this.carsRepository.save({
      ...car,
      ...createCarDto,
    });
    return changedCar;
  }

  async deleteByNumberPlate(numberPlate: string, user: User): Promise<void> {
    const car = await this.getByNumberPlate(numberPlate, user);
    await this.carsRepository.delete(car);
  }
}
