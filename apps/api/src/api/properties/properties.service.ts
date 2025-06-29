import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePropertyDto } from 'src/api/properties/dto/create-property-dto';
import { Property, PropertyDocument } from './schemas/property.schema';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private propertyModel: Model<PropertyDocument>,
  ) {}

  async create(dto: CreatePropertyDto): Promise<Property> {
    return this.propertyModel.create(dto);
  }

  async findAll(): Promise<Property[]> {
    return this.propertyModel.find().exec();
  }

  async findOne(id: string): Promise<Property> {
    const obj = await this.propertyModel.findById(id).exec();
    if (!obj) throw new NotFoundException('Property not found');
    return obj;
  }

  async remove(id: string) {
    return this.propertyModel.findByIdAndDelete(id).exec();
  }
}
