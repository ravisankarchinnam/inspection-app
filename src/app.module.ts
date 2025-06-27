import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TemplatesModule } from 'src/api/templates/templates.module';
import { ObjectsModule } from 'src/api/objects/objects.module';
import { InspectionsModule } from 'src/api/inspections/inspections.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TemplatesModule,
    ObjectsModule,
    InspectionsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
