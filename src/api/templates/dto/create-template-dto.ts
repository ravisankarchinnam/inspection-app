import {
  IsString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TemplateType } from 'src/api/templates/enums/template-type.enum';

class QuestionDto {
  @IsString()
  @ApiProperty()
  text: string;

  @IsString()
  @ApiProperty()
  type: TemplateType;

  @IsArray()
  @ApiProperty()
  options: string[];
}

export class CreateTemplateDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  @ApiProperty()
  questions: QuestionDto[];
}
