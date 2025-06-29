import { Controller, Post, Get, Param, Body, Put, Patch } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { UpdateInspectionDto } from './dto/update-inspection.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateInspectionStatusDto } from './dto/update-inspection-status.dto';

@Controller('inspections')
@ApiTags('inspections')
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates inspection',
  })
  create(@Body() createInspectionDto: CreateInspectionDto) {
    return this.inspectionsService.create(createInspectionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'finds all inspections',
  })
  findAll() {
    return this.inspectionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'finds the inspection by id',
  })
  findOne(@Param('id') id: string) {
    return this.inspectionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update the inspection by id',
  })
  update(@Param('id') id: string, @Body() dto: UpdateInspectionDto) {
    return this.inspectionsService.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateInspectionStatusDto,
  ) {
    return this.inspectionsService.updateStatus(id, dto);
  }
}
