import { PrismaService } from './../prisma/prisma.service';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CarDto } from './dto';
import { ERROR_UNIQUE_VALUE } from 'consts';
import { Car } from '@prisma/client';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  // TODO: set as guard
  checkUserCarOwnership = (car: Car, userId: number) => {
    if (!car || car.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }
    return true;
  };

  numberPlateNotFound = (car: Car, numberPlate: string) => {
    if (!car) {
      throw new NotFoundException(
        `The number plate:${numberPlate} doesn't exist.`,
      );
    }
    return true;
  };

  numberPlateDuplicated = (error: any, numberPlate: string) => {
    if (error === ERROR_UNIQUE_VALUE) {
      throw new ConflictException(
        `The number plate: ${numberPlate} already exists.`,
      );
    }
    return true;
  };

  async getCars(userId: number) {
    return await this.prisma.car.findMany({
      where: {
        userId,
      },
    });
  }

  async getCarByNumberPlate(userId: number, numberPlate: string) {
    const car = await this.prisma.car.findFirst({
      where: {
        numberPlate: numberPlate,
        userId,
      },
    });

    if (this.numberPlateNotFound(car, numberPlate)) {
      return car;
    }
  }

  async createCar(userId: number, carDto: CarDto) {
    const { numberPlate } = carDto;

    try {
      return await this.prisma.car.create({
        data: {
          userId: userId,
          ...carDto,
        },
      });
    } catch (error) {
      this.numberPlateDuplicated(error.code, numberPlate);
      throw new InternalServerErrorException();
    }
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

    if (
      this.numberPlateNotFound(car, numberPlate) &&
      this.checkUserCarOwnership(car, userId)
    ) {
      return this.prisma.car.update({
        where: {
          numberPlate: numberPlate,
        },
        data: {
          ...carDto,
        },
      });
    }
  }

  async deleteCarByNumberPlate(userId: number, numberPlate: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        numberPlate: numberPlate,
      },
    });

    if (
      this.numberPlateNotFound(car, numberPlate) &&
      this.checkUserCarOwnership(car, userId)
    ) {
      return this.prisma.car.delete({
        where: {
          numberPlate: numberPlate,
        },
      });
    }
  }
}
