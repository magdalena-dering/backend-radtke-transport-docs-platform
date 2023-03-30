import * as fs from 'fs';
import { CustomHttpExceptionResponse } from '../types/http-exception-response.interface';

export const getErrorLog = (
  responseBody: CustomHttpExceptionResponse,
): string => {
  const { statusCode, method, path, message, timestamp } = responseBody;
  const errorLog = `Response Code: ${statusCode} \nMethod: ${method} \nURL: ${path} \nMessage: ${message} \nTimestamp: ${timestamp}\n\n`;
  return errorLog;
};

export const writeErrorLogToFile = (errorLog: string): void => {
  fs.appendFile('error.log', errorLog, 'utf8', (err) => {
    if (err) throw err;
  });
};
