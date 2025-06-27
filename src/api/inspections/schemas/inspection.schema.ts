import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type InspectionDocument = HydratedDocument<Inspection>;

@Schema({ timestamps: true })
export class Inspection extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Property', required: true })
  propertyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Template', required: true })
  templateId: Types.ObjectId;

  @Prop([
    {
      questionId: { type: String, required: true },
      value: { type: Types.ObjectId, required: true },
    },
  ])
  answers: {
    questionId: string;
    value: Date | string | number | string[];
  }[];
}

export const InspectionSchema = SchemaFactory.createForClass(Inspection);
