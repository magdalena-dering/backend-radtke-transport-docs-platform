import { HttpStatus } from '@nestjs/common';

export const mapToHttpError = (statusCode: HttpStatus, param: string) => {
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
