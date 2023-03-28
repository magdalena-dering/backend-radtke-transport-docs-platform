import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';

export const mapToPrismaError = (
  exception: Prisma.PrismaClientKnownRequestError,
) => {
  const prismaCode = exception?.code;
  const prismaTarget = (exception?.meta?.target as Array<string>)?.join(',');
  const prismaMessage = exception?.meta?.message;

  const errorMap = {
    P2002: `The ${prismaTarget} already exists`,
    P2023: `Inconsistent column data: ${prismaMessage}`,
    P2021: `Inconsistent column data: ${prismaMessage}`,
    default: `Unhandled prisma code: ${prismaCode}`,
  };

  return errorMap[prismaCode] || errorMap.default;
};

export const mapToHttpError = (statusCode: number, param: string) => {
  const errorMap = {
    [HttpStatus.BAD_REQUEST]: 'Bad request exception.',
    [HttpStatus.UNAUTHORIZED]: 'Unauthorized user.',
    [HttpStatus.NOT_FOUND]: param ? `Not found ${param}.` : `Not found.`,
    [HttpStatus.CONFLICT]: 'Conflict exception.',
    [HttpStatus.FORBIDDEN]: 'Access to resources denied.',
    default: 'Internal server error.',
  };

  return errorMap[statusCode] || errorMap.default;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(
    exception: Prisma.PrismaClientKnownRequestError | HttpException,
    host: ArgumentsHost,
  ): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const param = request.params.numberPlate;
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const isPrismaError =
      exception instanceof Prisma.PrismaClientKnownRequestError;

    const message = isPrismaError
      ? mapToPrismaError(exception)
      : mapToHttpError(statusCode, param);

    const responseBody = {
      timestamp: new Date().toISOString(),
      message,
      statusCode,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
