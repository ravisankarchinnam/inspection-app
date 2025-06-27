import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InspectionsController } from 'src/api/inspections/inspections.controller';
import { InspectionsService } from 'src/api/inspections/inspections.service';
import {
  Inspection,
  InspectionSchema,
} from 'src/api/inspections/schemas/inspection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inspection.name, schema: InspectionSchema },
    ]),
  ],
  controllers: [InspectionsController],
  providers: [InspectionsService],
  exports: [InspectionsService],
})
export class InspectionsModule {}
