import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { UpdateTemplateDto } from './dto/update-template-dto';

describe('TemplatesController', () => {
  let controller: TemplatesController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplatesController],
      providers: [{ provide: TemplatesService, useValue: mockService }],
    }).compile();

    controller = module.get<TemplatesController>(TemplatesController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with dto and return result', async () => {
    const dto = { name: 'Test', questions: [] };
    const result = { id: '1', ...dto };
    mockService.create.mockResolvedValue(result);
    expect(await controller.create(dto)).toEqual(result);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should call service.findAll and return result', async () => {
    const result = [{ id: '1', name: 'Test', questions: [] }];
    mockService.findAll.mockResolvedValue(result);
    expect(await controller.findAll()).toEqual(result);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should call service.findOne with id and return result', async () => {
    const result = { id: '1', name: 'Test', questions: [] };
    mockService.findOne.mockResolvedValue(result);
    expect(await controller.findOne('1')).toEqual(result);
    expect(mockService.findOne).toHaveBeenCalledWith('1');
  });

  it('should call service.remove with id and return result', async () => {
    const result = { id: '1', name: 'Test', questions: [] };
    mockService.remove.mockResolvedValue(result);
    expect(await controller.remove('1')).toEqual(result);
    expect(mockService.remove).toHaveBeenCalledWith('1');
  });

  it('should call service.update with id and dto and return result', async () => {
    const id = 'templateId1';
    const dto = {
      questions: [
        { _id: 'q1', text: 'Question 1', type: 'STRING' },
        { _id: 'q2', text: 'Question 2', type: 'STRING' },
      ],
    };
    const result = { id, ...dto };
    mockService.update.mockResolvedValue(result);
    expect(await controller.update(id, dto as UpdateTemplateDto)).toEqual(
      result,
    );
    expect(mockService.update).toHaveBeenCalledWith(id, dto);
  });
});
