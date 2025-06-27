import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesService } from './templates.service';
import { getModelToken } from '@nestjs/mongoose';
import { Template } from './schemas/template.schema';

describe('TemplatesService', () => {
  let service: TemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesService,
        {
          provide: getModelToken(Template.name),
          useValue: {
            create: jest.fn().mockResolvedValue({ name: 'Test Template' }),
          },
        },
      ],
    }).compile();

    service = module.get<TemplatesService>(TemplatesService);
  });

  it('should create a template', async () => {
    const result = await service.create({
      name: 'Test Template',
      questions: [],
    });
    expect(result).toEqual({ name: 'Test Template' });
  });
});
