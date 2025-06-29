import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from './properties.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

const mockProperty = { _id: '1', name: 'Test Property' };

const mockPropertyModel = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('PropertiesService', () => {
  let service: PropertiesService;
  let model: typeof mockPropertyModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        { provide: getModelToken('Property'), useValue: mockPropertyModel },
      ],
    }).compile();
    service = module.get<PropertiesService>(PropertiesService);
    model = module.get(getModelToken('Property'));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a property', async () => {
    model.create.mockResolvedValue(mockProperty);
    const dto = { name: 'Test Property' };
    expect(await service.create(dto as any)).toEqual(mockProperty);
    expect(model.create).toHaveBeenCalledWith(dto);
  });

  it('should return all properties', async () => {
    const execMock = jest.fn().mockResolvedValue([mockProperty]);
    model.find.mockReturnValue({ exec: execMock });
    expect(await service.findAll()).toEqual([mockProperty]);
    expect(model.find).toHaveBeenCalled();
    expect(execMock).toHaveBeenCalled();
  });

  it('should return a property by id', async () => {
    const execMock = jest.fn().mockResolvedValue(mockProperty);
    model.findById.mockReturnValue({ exec: execMock });
    expect(await service.findOne('1')).toEqual(mockProperty);
    expect(model.findById).toHaveBeenCalledWith('1');
    expect(execMock).toHaveBeenCalled();
  });

  it('should throw NotFoundException if property not found', async () => {
    const execMock = jest.fn().mockResolvedValue(null);
    model.findById.mockReturnValue({ exec: execMock });
    await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
    expect(model.findById).toHaveBeenCalledWith('2');
    expect(execMock).toHaveBeenCalled();
  });

  it('should delete a property by id', async () => {
    const execMock = jest.fn().mockResolvedValue(mockProperty);
    model.findByIdAndDelete.mockReturnValue({ exec: execMock });
    expect(await service.remove('1')).toEqual(mockProperty);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(execMock).toHaveBeenCalled();
  });
});
