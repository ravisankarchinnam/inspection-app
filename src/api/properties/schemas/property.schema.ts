import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ timestamps: true })
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  postalCode: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  name: string;

  @Prop({ type: AddressSchema, required: true })
  address: Address;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
