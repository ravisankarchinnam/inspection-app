import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplatesModule } from './templates/templates.module';
import { ObjectsModule } from './objects/objects.module';
import { InspectionsModule } from './inspections/inspections.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TemplatesModule, ObjectsModule, InspectionsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
