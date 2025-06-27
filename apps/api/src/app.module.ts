import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  HttpExceptionFilter,
  RequestLoggerMiddleware,
  ResponseLoggerInterceptor,
} from 'src/common';
import { DatabaseModule } from 'src/database/database.module';
import { TemplatesModule } from 'src/api/templates/templates.module';
import { PropertiesModule } from 'src/api/properties/properties.module';
import { InspectionsModule } from 'src/api/inspections/inspections.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TemplatesModule,
    PropertiesModule,
    InspectionsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseLoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
