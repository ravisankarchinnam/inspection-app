import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template-dto';

@Controller('templates')
@ApiTags('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates template',
  })
  create(@Body() dto: CreateTemplateDto) {
    return this.templatesService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'finds all templates',
  })
  findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'finds the template by id',
  })
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'deletes the template by id',
  })
  remove(@Param('id') id: string) {
    return this.templatesService.remove(id);
  }
}
