import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { PropertiesService } from 'src/api/properties/properties.service';
import { CreatePropertyDto } from 'src/api/properties/dto/create-property-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('properties')
@ApiTags('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates property',
  })
  create(@Body() dto: CreatePropertyDto) {
    return this.propertiesService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'finds all properties',
  })
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'finds the property by id',
  })
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'deletes the template by id',
  })
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(id);
  }
}
