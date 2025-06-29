import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';
import { CreateTemplateDto } from 'src/api/templates/dto/create-template-dto';
import { UpdateTemplateDto } from './dto/update-template-dto';

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

  async remove(id: string) {
    return this.templateModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, dto: UpdateTemplateDto) {
    const tpl = await this.templateModel.findById(id).exec();
    if (!tpl) {
      throw new NotFoundException('Template not found');
    }

    const questionsToAdd = dto.questions.filter(
      (q) =>
        !tpl.questions.some(
          (existingQ) => existingQ._id?.toString() === q._id?.toString(),
        ),
    );

    if (questionsToAdd.length) {
      await this.templateModel.updateOne(
        { _id: id },
        { $push: { questions: { $each: questionsToAdd } } },
      );
    }
  }
}
