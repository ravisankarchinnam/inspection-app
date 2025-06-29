import { Test, TestingModule } from '@nestjs/testing';
import { InspectionsController } from './inspections.controller';
import { InspectionsService } from './inspections.service';
import { InspectionStatus } from './enums/inspection-status.enum';

describe('InspectionsController', () => {
  let controller: InspectionsController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    updateStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionsController],
      providers: [{ provide: InspectionsService, useValue: mockService }],
    }).compile();

    controller = module.get<InspectionsController>(InspectionsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with dto and return result', async () => {
    const dto = {
      templateId: 'tid',
      propertyId: 'pid',
      propertyName: 'Property',
      templateName: 'Template',
    };
    const result = { id: '1', ...dto };
    mockService.create.mockResolvedValue(result);
    expect(await controller.create(dto)).toEqual(result);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should call service.findAll and return result', async () => {
    const result = [{ id: '1' }];
    mockService.findAll.mockResolvedValue(result);
    expect(await controller.findAll()).toEqual(result);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should call service.findOne with id and return result', async () => {
    const result = { id: '1' };
    mockService.findOne.mockResolvedValue(result);
    expect(await controller.findOne('1')).toEqual(result);
    expect(mockService.findOne).toHaveBeenCalledWith('1');
  });

  it('should call service.update with id and dto and return result', async () => {
    const dto = { answers: [] };
    const result = { id: '1', ...dto };
    mockService.update.mockResolvedValue(result);
    expect(await controller.update('1', dto)).toEqual(result);
    expect(mockService.update).toHaveBeenCalledWith('1', dto);
  });

  it('should call service.updateStatus with id and dto and return result', async () => {
    const dto = { status: InspectionStatus.COMPLETED };
    const result = { id: '1', ...dto };
    mockService.updateStatus.mockResolvedValue(result);
    expect(await controller.updateStatus('1', dto)).toEqual(result);
    expect(mockService.updateStatus).toHaveBeenCalledWith('1', dto);
  });
});
