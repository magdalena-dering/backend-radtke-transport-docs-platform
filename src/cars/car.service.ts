import { ERROR_DUPLICATE_KEY_VALUE } from './../../consts';
import { User } from './../auth/entities/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carsRepository: Repository<Car>) {}

  async getAll(user: User): Promise<Car[]> {
    const query = this.carsRepository.createQueryBuilder('car').where({ user });
    return query.getMany();
  }

  async getByNumberPlate(numberPlate: string, user: User): Promise<Car> {
    const car = await this.carsRepository.findOne({
      where: { numberPlate, user },
    });
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
    const car = this.getByNumberPlate(numberPlate, user);
    const changedCar = await this.carsRepository.save({
      ...car,
      ...createCarDto,
    });
    return changedCar;
  }

  async deleteByNumberPlate(id: string, user: User): Promise<void> {
    await this.carsRepository.delete({ id, user });
  }
}
