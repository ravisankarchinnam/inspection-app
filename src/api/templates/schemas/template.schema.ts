import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TemplateType } from 'src/api/templates/enums/template-type.enum';

export type TemplateDocument = HydratedDocument<Template>;

@Schema({ _id: true, timestamps: true })
export class Question {
  _id: Types.ObjectId;

  @Prop({ required: true }) text: string;

  @Prop({
    required: true,
    enum: TemplateType,
  })
  type: TemplateType;

  @Prop([String])
  options: string[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({ timestamps: true })
export class Template {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [QuestionSchema], default: [] })
  questions: Question[];
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
