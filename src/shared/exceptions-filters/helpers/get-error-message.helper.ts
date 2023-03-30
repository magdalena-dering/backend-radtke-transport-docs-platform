import { HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomHttpExceptionResponse } from '../types/http-exception-response.interface';
import { mapToPrismaError } from './prisma-error.helper';

export const getErrorMessage = (
  exception: Prisma.PrismaClientKnownRequestError | HttpException,
): string => {
  if (exception instanceof HttpException) {
    const { message } = exception.getResponse() as CustomHttpExceptionResponse;
    return message || exception.message;
  }

  if (exception instanceof Prisma.PrismaClientKnownRequestError) {
    return mapToPrismaError(exception);
  }

  return String(exception);
};
