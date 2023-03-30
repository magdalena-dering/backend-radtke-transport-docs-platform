export interface CustomHttpExceptionResponse {
  timestamp: string;
  message: string;
  path: string;
  method: string;
  statusCode: number;
}
