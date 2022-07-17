import { User } from './../auth/entities/user.entity';
import { Injectable } from '@nestjs/common';
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

  async getById(id: string, user: User): Promise<Car> {
    const car = await this.carsRepository.findOne({ where: { id, user } });
    return car;
  }

  async create(createCarDto: CreateCarDto, user: User): Promise<void> {
    const car = this.carsRepository.create({ ...createCarDto, user });
    await this.carsRepository.save(car);
  }

  async updateById(
    id: string,
    createCarDto: CreateCarDto,
    user: User,
  ): Promise<Car> {
    const car = this.getById(id, user);
    const changedCar = await this.carsRepository.save({
      ...car,
      ...createCarDto,
    });
    return changedCar;
  }

  async deleteById(id: string, user: User): Promise<void> {
    await this.carsRepository.delete({ id, user });
  }
}
