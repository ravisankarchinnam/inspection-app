import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { AnswerDto } from 'src/api/inspections/dto/create-inspection.dto';

export class UpdateInspectionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @ApiProperty({ isArray: true, type: AnswerDto })
  answers: AnswerDto[];
}
