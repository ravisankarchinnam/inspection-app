import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ObjDocument = HydratedDocument<Obj>;

@Schema()
export class Obj {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: {
      street: String,
      number: String,
      city: String,
      postalCode: String,
    },
    required: true,
  })
  address: {
    street: string;
    number: string;
    city: string;
    postalCode: string;
  };
}

export const ObjSchema = SchemaFactory.createForClass(Obj);
