import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CarDto } from './dto';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  getCars(userId: number) {
    return this.prisma.car.findMany({
      where: {
        userId,
      },
    });
  }

  getCarByNumberPlate(userId: number, numberPlate: string) {
    return this.prisma.car.findFirst({
      where: {
        numberPlate: numberPlate,
        userId,
      },
    });
  }

  async createCar(userId: number, carDto: CarDto) {
    const car = await this.prisma.car.create({
      data: {
        userId,
        ...carDto,
      },
    });

    return car;
  }

  async editCarByNumberPlate(
    userId: number,
    numberPlate: string,
    carDto: CarDto,
  ) {
    const car = await this.prisma.car.findUnique({
      where: {
        numberPlate: numberPlate,
      },
    });

    // check if user owns the car
    if (!car || car.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.car.update({
      where: {
        numberPlate: numberPlate,
      },
      data: {
        ...carDto,
      },
    });
  }

  async deleteCarByNumberPlate(userId: number, numberPlate: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        numberPlate: numberPlate,
      },
    });

    // check if user owns the car
    if (!car || car.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.car.delete({
      where: {
        numberPlate: numberPlate,
      },
    });
  }
}
