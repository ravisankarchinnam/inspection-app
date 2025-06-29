import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { InspectionStatus } from 'src/api/inspections/enums/inspection-status.enum';

export type InspectionDocument = HydratedDocument<Inspection>;

type Answer = {
  questionId: string;
  value: string | number | string[];
};
@Schema({ _id: true, timestamps: true })
export class Inspection {
  @Prop({ type: Types.ObjectId, ref: 'Property', required: true })
  propertyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Template', required: true })
  templateId: Types.ObjectId;

  @Prop({ required: true })
  templateName: string;

  @Prop({ required: true })
  propertyName: string;

  @Prop({
    enum: InspectionStatus,
    default: InspectionStatus.PENDING,
  })
  status: InspectionStatus;

  @Prop({ required: true })
  answers: Answer[];
}

export const InspectionSchema = SchemaFactory.createForClass(Inspection);
