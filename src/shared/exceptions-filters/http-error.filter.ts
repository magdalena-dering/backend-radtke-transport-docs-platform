import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { CustomHttpExceptionResponse } from './types/http-exception-response.interface';

import { mapToPrismaError } from './helpers/prisma-error.helper';
import { mapToHttpError } from './helpers/http-error.helper';
import { getErrorLog, writeErrorLogToFile } from './helpers/error-log.helper';

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
    const { path, method } = request;
    const param = request.params.numberPlate;
    const statusCode: HttpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const isPrismaError =
      exception instanceof Prisma.PrismaClientKnownRequestError;

    const message: string = isPrismaError
      ? mapToPrismaError(exception)
      : mapToHttpError(statusCode, param);

    const responseBody: CustomHttpExceptionResponse = {
      timestamp: new Date().toISOString(),
      message,
      path,
      method,
      statusCode,
    };

    const error = getErrorLog(responseBody);
    writeErrorLogToFile(error);
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
