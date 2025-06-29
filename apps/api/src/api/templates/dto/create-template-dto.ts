import {
  IsString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TemplateType } from '../enums/template-type.enum';

export class QuestionDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  _id?: string;

  @IsString()
  @ApiProperty()
  text: string;

  @IsEnum(TemplateType)
  @ApiProperty({ enum: TemplateType })
  type: TemplateType;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isRequired?: boolean;

  @IsOptional()
  @IsArray()
  @ApiProperty({ required: false })
  options?: string[];
}

export class CreateTemplateDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  @ApiProperty({ isArray: true, type: QuestionDto })
  questions: QuestionDto[];
}
