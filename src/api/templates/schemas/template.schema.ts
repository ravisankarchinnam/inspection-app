import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TemplateType } from '../enums/template-type.enum';

export type TemplateDocument = HydratedDocument<Template>;

@Schema()
export class Question {
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

@Schema()
export class Template {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [QuestionSchema], default: [] })
  questions: Question[];
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
