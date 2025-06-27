import {
  IsString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TemplateType } from 'src/api/templates/enums/template-type.enum';

export class QuestionDto {
  @IsString()
  @ApiProperty()
  text: string;

  @IsEnum(TemplateType)
  @ApiProperty({ enum: TemplateType })
  type: TemplateType;

  @IsOptional()
  @IsArray()
  @ApiProperty({ required: false })
  options?: string[];
}

export class CreateTemplateDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  @ApiProperty({ isArray: true, type: QuestionDto })
  questions: QuestionDto[];
}
