import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResultCode } from '../enums/result-code.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    let errorMessage = 'Unexpected error';

    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      const { message } = exceptionResponse as any;
      errorMessage = Array.isArray(message) ? message[0] : message;
    }

    const resultCode =
      status === HttpStatus.BAD_REQUEST
        ? ResultCode.VALIDATION_ERROR
        : ResultCode.SERVER_ERROR;

    response.status(status).json({
      header: {
        resultCode,
        error: errorMessage,
      },
    });
  }
}
