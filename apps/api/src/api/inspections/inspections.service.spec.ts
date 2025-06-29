import { Test, TestingModule } from '@nestjs/testing';
import { InspectionsService } from './inspections.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InspectionStatus } from './enums/inspection-status.enum';
import { TemplatesService } from '../templates/templates.service';
import { PropertiesService } from '../properties/properties.service';

interface CreateInspectionDto {
  templateId: string;
  propertyId: string;
  propertyName: string;
  templateName: string;
}
interface UpdateInspectionDto {
  answers: any[];
}
interface UpdateInspectionStatusDto {
  status: InspectionStatus;
}

const mockInspection = { _id: '1', templateId: 'tid', propertyId: 'pid' };
const mockTemplate = { _id: 'tid', questions: [], name: 'Template' };
const mockProperty = { _id: 'pid', name: 'Property' };

const mockInspectionModel = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
};

const mockTemplatesService = {
  findOne: jest.fn(),
};

const mockPropertiesService = {
  findOne: jest.fn(),
};

describe('InspectionsService', () => {
  let service: InspectionsService;
  let model: typeof mockInspectionModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InspectionsService,
        { provide: getModelToken('Inspection'), useValue: mockInspectionModel },
        { provide: TemplatesService, useValue: mockTemplatesService },
        { provide: PropertiesService, useValue: mockPropertiesService },
      ],
    }).compile();
    service = module.get<InspectionsService>(InspectionsService);
    model = module.get(getModelToken('Inspection'));
    jest.clearAllMocks();
  });

  describe('create', () => {
    const baseDto: CreateInspectionDto = {
      templateId: 'tid',
      propertyId: 'pid',
      propertyName: 'Property',
      templateName: 'Template',
    };
    it('should throw if template not found', async () => {
      mockTemplatesService.findOne.mockResolvedValue(null);
      await expect(service.create(baseDto)).rejects.toThrow(
        BadRequestException,
      );
    });
    it('should throw if property not found', async () => {
      mockTemplatesService.findOne.mockResolvedValue(mockTemplate);
      mockPropertiesService.findOne.mockResolvedValue(null);
      await expect(service.create(baseDto)).rejects.toThrow(
        BadRequestException,
      );
    });
    it('should create and return inspection', async () => {
      mockTemplatesService.findOne.mockResolvedValue(mockTemplate);
      mockPropertiesService.findOne.mockResolvedValue(mockProperty);
      model.create.mockResolvedValue(mockInspection);
      expect(await service.create(baseDto)).toEqual(mockInspection);
      expect(model.create).toHaveBeenCalledWith(baseDto);
    });
  });

  describe('findAll', () => {
    it('should return all inspections', async () => {
      const execMock = jest.fn().mockResolvedValue([mockInspection]);
      model.find.mockReturnValue({ exec: execMock });
      expect(await service.findAll()).toEqual([mockInspection]);
      expect(model.find).toHaveBeenCalled();
      expect(execMock).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return inspection by id', async () => {
      const execMock = jest.fn().mockResolvedValue(mockInspection);
      model.findById.mockReturnValue({ exec: execMock });
      expect(await service.findOne('1')).toEqual(mockInspection);
      expect(model.findById).toHaveBeenCalledWith('1');
      expect(execMock).toHaveBeenCalled();
    });
    it('should throw NotFoundException if not found', async () => {
      const execMock = jest.fn().mockResolvedValue(null);
      model.findById.mockReturnValue({ exec: execMock });
      await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
      expect(model.findById).toHaveBeenCalledWith('2');
      expect(execMock).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update and return inspection', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue({ _id: '1', templateId: 'tid' } as any);
      jest
        .spyOn(service as any, 'validateAnswers')
        .mockResolvedValue(undefined);
      model.findByIdAndUpdate.mockResolvedValue(mockInspection);
      const dto: UpdateInspectionDto = { answers: [] };
      expect(await service.update('1', dto)).toEqual(mockInspection);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { answers: dto.answers },
        { upsert: true },
      );
    });
    it('should throw if update fails', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue({ _id: '1', templateId: 'tid' } as any);
      jest
        .spyOn(service as any, 'validateAnswers')
        .mockResolvedValue(undefined);
      model.findByIdAndUpdate.mockResolvedValue(null);
      const dto: UpdateInspectionDto = { answers: [] };
      await expect(service.update('1', dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateStatus', () => {
    it('should update status and return inspection', async () => {
      model.findByIdAndUpdate.mockResolvedValue(mockInspection);
      const dto: UpdateInspectionStatusDto = {
        status: InspectionStatus.COMPLETED,
      };
      expect(await service.updateStatus('1', dto)).toEqual(mockInspection);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { status: dto.status },
        { new: true },
      );
    });
    it('should throw if inspection not found', async () => {
      model.findByIdAndUpdate.mockResolvedValue(null);
      const dto: UpdateInspectionStatusDto = {
        status: InspectionStatus.COMPLETED,
      };
      await expect(service.updateStatus('1', dto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
