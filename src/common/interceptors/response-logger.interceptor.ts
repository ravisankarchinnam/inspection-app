import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResponseLoggerInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  private logger = new Logger(ResponseLoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method } = req;

    const canShowLog = this.configService.get('env') !== 'test';

    return next.handle().pipe(
      tap({
        next: (val) => {
          if (canShowLog) {
            this.logger.log({
              body: val,
              statusCode,
              method,
              url: originalUrl,
              type: '[RESPONSE]',
            });
          }
        },
        error: (error) => {
          if (canShowLog) {
            const { response, status } = error;
            this.logger.error({
              body: response,
              statusCode: status,
              method,
              url: originalUrl,
              type: '[ERROR]',
            });
          }
        },
      }),
    );
  }
}
