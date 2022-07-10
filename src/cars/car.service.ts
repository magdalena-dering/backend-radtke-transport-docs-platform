import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carsRepository: Repository<Car>) {}

  async getAll(): Promise<Car[]> {
    const query = this.carsRepository.createQueryBuilder('car');
    return query.getMany();
  }

  async getById(id: string): Promise<Car> {
    const car = await this.carsRepository.findOne({ where: { id } });
    return car;
  }

  async create(createCarDto: CreateCarDto): Promise<void> {
    const car = this.carsRepository.create(createCarDto);
    await this.carsRepository.save(car);
  }

  async updateById(id: string, createCarDto: CreateCarDto): Promise<Car> {
    const car = this.getById(id);
    const changedCar = await this.carsRepository.save({
      ...car,
      ...createCarDto,
    });
    return changedCar;
  }

  async deleteById(id: string): Promise<void> {
    await this.carsRepository.delete({ id });
  }
}
