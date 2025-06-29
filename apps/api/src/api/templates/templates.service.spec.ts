import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesService } from './templates.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { TemplateType } from '../templates/enums/template-type.enum';

type CreateTemplateDto = { name: string; questions: any[] };
const mockTemplate = {
  _id: 'templateId1',
  name: 'Test Template',
  questions: [],
};

describe('TemplatesService', () => {
  let service: TemplatesService;
  let model: jest.Mocked<Partial<Model<any>>>;

  beforeEach(async () => {
    const mockModel: jest.Mocked<Partial<Model<any>>> = {
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesService,
        {
          provide: getModelToken('Template'),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<TemplatesService>(TemplatesService);
    model = module.get(getModelToken('Template'));
    // @ts-expect-error: Assigning mock model for testing
    service['templateModel'] = model;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a template', async () => {
      const dto: CreateTemplateDto = { name: 'Test Template', questions: [] };
      const saveMock = jest.fn().mockResolvedValue(mockTemplate);
      // Simulate new model instance with save method
      // @ts-expect-error: Assigning mock constructor for testing
      service['templateModel'] = function () {
        return { save: saveMock };
      };
      const result = await service.create(dto);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(mockTemplate);
    });
  });

  describe('findAll', () => {
    it('should return all templates', async () => {
      const execMock = jest.fn().mockResolvedValue([mockTemplate]);
      (model.find as jest.Mock).mockReturnValue({ exec: execMock });
      const result = await service.findAll();
      expect(model.find).toHaveBeenCalled();
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual([mockTemplate]);
    });
  });

  describe('findOne', () => {
    it('should return a template by id', async () => {
      const execMock = jest.fn().mockResolvedValue(mockTemplate);
      (model.findById as jest.Mock).mockReturnValue({ exec: execMock });
      const result = await service.findOne('templateId1');
      expect(model.findById).toHaveBeenCalledWith('templateId1');
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual(mockTemplate);
    });

    it('should throw NotFoundException if template does not exist', async () => {
      const execMock = jest.fn().mockResolvedValue(null);
      (model.findById as jest.Mock).mockReturnValue({ exec: execMock });
      await expect(service.findOne('notfound')).rejects.toThrow(
        NotFoundException,
      );
      expect(model.findById).toHaveBeenCalledWith('notfound');
      expect(execMock).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete a template by id', async () => {
      const execMock = jest.fn().mockResolvedValue(mockTemplate);
      (model.findByIdAndDelete as jest.Mock).mockReturnValue({
        exec: execMock,
      });
      const result = await service.remove('templateId1');
      expect(model.findByIdAndDelete).toHaveBeenCalledWith('templateId1');
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual(mockTemplate);
    });
  });
  describe('update', () => {
    const updateDto = {
      questions: [
        { _id: 'q1', text: 'Question 1', type: TemplateType.STRING },
        { _id: 'q2', text: 'Question 2', type: TemplateType.STRING },
      ],
    };

    beforeEach(() => {
      // Ensure updateOne is always mocked for each test
      (model.updateOne as jest.Mock) = jest.fn();
    });

    it('should throw NotFoundException if template does not exist', async () => {
      const execMock = jest.fn().mockResolvedValue(null);
      (model.findById as jest.Mock).mockReturnValue({ exec: execMock });

      await expect(service.update('notfound', updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(model.findById).toHaveBeenCalledWith('notfound');
      expect(execMock).toHaveBeenCalled();
    });

    it('should add new questions not present in template', async () => {
      const tpl = {
        _id: 'templateId1',
        name: 'Test Template',
        questions: [
          { _id: 'q1', text: 'Question 1', type: TemplateType.STRING },
        ],
      };
      const execMock = jest.fn().mockResolvedValue(tpl);
      (model.findById as jest.Mock).mockReturnValue({ exec: execMock });

      const updateOneMock = jest.fn().mockResolvedValue({});
      (model.updateOne as jest.Mock) = updateOneMock;

      await service.update('templateId1', updateDto);

      expect(model.findById).toHaveBeenCalledWith('templateId1');
      expect(execMock).toHaveBeenCalled();
      expect(updateOneMock).toHaveBeenCalledWith(
        { _id: 'templateId1' },
        {
          $push: {
            questions: {
              $each: [
                { _id: 'q2', text: 'Question 2', type: TemplateType.STRING },
              ],
            },
          },
        },
      );
    });

    it('should not call updateOne if all questions already exist', async () => {
      const tpl = {
        _id: 'templateId1',
        name: 'Test Template',
        questions: [
          { _id: 'q1', text: 'Question 1', type: TemplateType.STRING },
          { _id: 'q2', text: 'Question 2', type: TemplateType.STRING },
        ],
      };
      const execMock = jest.fn().mockResolvedValue(tpl);
      (model.findById as jest.Mock).mockReturnValue({ exec: execMock });

      const updateOneMock = jest.fn();
      (model.updateOne as jest.Mock) = updateOneMock;

      await service.update('templateId1', updateDto);

      expect(model.findById).toHaveBeenCalledWith('templateId1');
      expect(execMock).toHaveBeenCalled();
      expect(updateOneMock).not.toHaveBeenCalled();
    });
  });
});
