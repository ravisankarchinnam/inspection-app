import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inspection, InspectionDocument } from './schemas/inspection.schema';
import { AnswerDto, CreateInspectionDto } from './dto/create-inspection.dto';
import { UpdateInspectionDto } from './dto/update-inspection.dto';
import { TemplatesService } from '../templates/templates.service';
import { TemplateType } from '../templates/enums/template-type.enum';

@Injectable()
export class InspectionsService {
  constructor(
    @InjectModel(Inspection.name)
    private inspectionModel: Model<InspectionDocument>,
    private readonly templatesService: TemplatesService,
  ) {}

  private async validateAnswers(templateId: string, answers?: AnswerDto[]) {
    const template = await this.templatesService.findOne(templateId);
    if (!template) throw new BadRequestException('Invalid templateId');

    if (!answers?.length) {
      return;
    }

    const questionMap = new Map(
      template.questions.map((q) => [q._id?.toString(), q]),
    );

    for (const answer of answers) {
      const question = questionMap.get(answer.questionId);
      if (!question) {
        throw new BadRequestException(
          `Question ID ${answer.questionId} is not part of the template.`,
        );
      }

      switch (question.type) {
        case TemplateType.DATE:
          if (
            typeof answer.value === 'string' &&
            isNaN(Date.parse(answer.value))
          )
            throw new BadRequestException(
              `Invalid date for question ${question._id?.toString()}`,
            );
          break;
        case TemplateType.NUMBER:
          if (typeof answer.value !== 'number')
            throw new BadRequestException(
              `Expected numeric answer for question ${question._id?.toString()}`,
            );
          break;
        case TemplateType.MULTI:
          if (!Array.isArray(answer.value))
            throw new BadRequestException(
              `Expected array for multi-choice question ${question._id?.toString()}`,
            );
          for (const choice of answer.value) {
            if (
              typeof choice === 'string' &&
              !question.options.includes(choice)
            ) {
              throw new BadRequestException(
                `Invalid option '${choice}' for question ${question._id?.toString()}`,
              );
            }
          }
          break;
        case TemplateType.SINGLE:
          if (
            typeof answer.value === 'string' &&
            !question.options.includes(answer.value)
          ) {
            throw new BadRequestException(
              `Invalid option '${answer.value}' for question ${question._id?.toString()}`,
            );
          }
          break;
        case TemplateType.STRING:
          if (typeof answer.value !== 'string')
            throw new BadRequestException(
              `Expected string for question ${question._id?.toString()}`,
            );
          break;
        default:
          throw new BadRequestException(
            `Unsupported question type: ${JSON.stringify(question)}`,
          );
      }
    }
  }

  async create(createInspectionDto: CreateInspectionDto): Promise<Inspection> {
    await this.validateAnswers(
      createInspectionDto.templateId,
      createInspectionDto.answers,
    );
    return this.inspectionModel.create(createInspectionDto);
  }

  async findAll(): Promise<Inspection[]> {
    return this.inspectionModel.find().exec();
  }

  async findOne(id: string): Promise<Inspection> {
    const inspection = await this.inspectionModel.findById(id).exec();
    if (!inspection) throw new NotFoundException('Inspection not found');
    return inspection;
  }

  async update(
    id: string,
    updateInspectionDto: UpdateInspectionDto,
  ): Promise<Inspection> {
    const inspection = await this.findOne(id);

    if (updateInspectionDto.answers) {
      await this.validateAnswers(
        inspection.templateId.toString(),
        updateInspectionDto.answers,
      );
    }

    const updatedInspection = await this.inspectionModel
      .findByIdAndUpdate(
        id,
        { answers: updateInspectionDto.answers },
        { new: true },
      )
      .exec();

    if (!updatedInspection)
      throw new NotFoundException('Update Inspection failed');

    return updatedInspection;
  }
}
