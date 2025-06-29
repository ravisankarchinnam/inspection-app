import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class AnswerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  questionId: string;

  @IsNotEmpty()
  @ApiProperty()
  value: string | number | string[];
}

export class UpdateInspectionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @ApiProperty({ isArray: true, type: AnswerDto })
  answers: AnswerDto[];
}
