import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

describe('PropertiesController', () => {
  let controller: PropertiesController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const address = {
    street: '123 Main St',
    number: '1', // changed to string
    city: 'Test City',
    postalCode: '12345',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [{ provide: PropertiesService, useValue: mockService }],
    }).compile();

    controller = module.get<PropertiesController>(PropertiesController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with dto and return result', async () => {
    const dto = { name: 'Test Property', address, questions: [] };
    const result = { id: '1', ...dto };
    mockService.create.mockResolvedValue(result);
    expect(await controller.create(dto)).toEqual(result);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should call service.findAll and return result', async () => {
    const result = [{ id: '1', name: 'Test Property', address, questions: [] }];
    mockService.findAll.mockResolvedValue(result);
    expect(await controller.findAll()).toEqual(result);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should call service.findOne with id and return result', async () => {
    const result = { id: '1', name: 'Test Property', address, questions: [] };
    mockService.findOne.mockResolvedValue(result);
    expect(await controller.findOne('1')).toEqual(result);
    expect(mockService.findOne).toHaveBeenCalledWith('1');
  });

  it('should call service.remove with id and return result', async () => {
    const result = { id: '1', name: 'Test Property', address, questions: [] };
    mockService.remove.mockResolvedValue(result);
    expect(await controller.remove('1')).toEqual(result);
    expect(mockService.remove).toHaveBeenCalledWith('1');
  });
});
