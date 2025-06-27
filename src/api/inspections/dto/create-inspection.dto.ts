import {
  IsMongoId,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  questionId: string;

  @IsNotEmpty()
  @ApiProperty()
  value: any;
}

export class CreateInspectionDto {
  @IsMongoId()
  @ApiProperty()
  propertyId: string;

  @IsMongoId()
  @ApiProperty()
  templateId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @ApiProperty({ isArray: true, type: AnswerDto })
  answers: AnswerDto[];
}
