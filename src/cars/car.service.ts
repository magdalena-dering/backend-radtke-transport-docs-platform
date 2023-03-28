import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CarDto } from './dto';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  async getCars(userId: number) {
    return await this.prisma.car.findMany({
      where: {
        userId,
      },
    });
  }

  async getCarByNumberPlate(numberPlate: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        numberPlate,
      },
    });

    return car;
  }

  async createCar(userId: number, carDto: CarDto) {
    return await this.prisma.car.create({
      data: {
        userId,
        ...carDto,
      },
    });
  }

  async editCarByNumberPlate(numberPlate: string, carDto: CarDto) {
    return this.prisma.car.update({
      where: {
        numberPlate,
      },
      data: {
        ...carDto,
      },
    });
  }

  async deleteCarByNumberPlate(numberPlate: string) {
    return this.prisma.car.delete({
      where: {
        numberPlate,
      },
    });
  }
}
