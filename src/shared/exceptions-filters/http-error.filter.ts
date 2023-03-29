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

import { getErrorLog, writeErrorLogToFile } from './helpers/error-log.helper';
import { getErrorMessage } from './helpers/get-error-message.helper';

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

    const statusCode: HttpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message: string = getErrorMessage(exception);

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
