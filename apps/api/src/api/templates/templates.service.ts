import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Template,
  TemplateDocument,
} from 'src/api/templates/schemas/template.schema';
import { CreateTemplateDto } from 'src/api/templates/dto/create-template-dto';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
  ) {}

  create(dto: CreateTemplateDto) {
    return new this.templateModel(dto).save();
  }

  findAll() {
    return this.templateModel.find().exec();
  }

  async findOne(id: string) {
    const tpl = await this.templateModel.findById(id).exec();
    if (!tpl) throw new NotFoundException('Template not found');
    return tpl;
  }
}
