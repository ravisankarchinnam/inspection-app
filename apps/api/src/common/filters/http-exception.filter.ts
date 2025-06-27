import { Request, Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ErrorResponse } from 'src/common/types';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionContent = exception.getResponse() as ErrorResponse;
    this.logger.error(exceptionContent);

    if (exceptionContent.message) {
      return response.status(status).json(exceptionContent);
    }

    return response.status(status).json({
      ...exceptionContent,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
