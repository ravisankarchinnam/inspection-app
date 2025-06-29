import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionDto } from './create-template-dto';

export class UpdateTemplateDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  @ApiProperty({ isArray: true, type: QuestionDto })
  questions: QuestionDto[];
}
