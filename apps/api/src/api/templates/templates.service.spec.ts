import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesService } from './templates.service';
import { getModelToken } from '@nestjs/mongoose';
import { Template } from 'src/api/templates/schemas/template.schema';
import { TemplateType } from 'src/api/templates/enums/template-type.enum';

describe('TemplatesService', () => {
  let service: TemplatesService;
  // let model: any;

  const mockTemplate = {
    name: 'Test Template',
    questions: [{ text: 'Inspection Date', type: 'date' }],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesService,
        {
          provide: getModelToken(Template.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockTemplate),
            find: jest.fn().mockResolvedValue([mockTemplate]),
            findById: jest.fn().mockResolvedValue(mockTemplate),
          },
        },
      ],
    }).compile();

    service = module.get<TemplatesService>(TemplatesService);
    // model = module.get(getModelToken(Template.name));
  });

  it('should create a template', async () => {
    const createTemplateDto = {
      name: 'Test Template',
      questions: [{ text: 'Inspection Date', type: TemplateType.date }],
    };
    const result = await service.create(createTemplateDto);
    expect(result).toEqual(mockTemplate);
  });
});
