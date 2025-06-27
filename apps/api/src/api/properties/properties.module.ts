import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Property,
  PropertySchema,
} from 'src/api/properties/schemas/property.schema';
import { PropertiesController } from 'src/api/properties/properties.controller';
import { PropertiesService } from 'src/api/properties/properties.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Property.name,
        schema: PropertySchema,
      },
    ]),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
