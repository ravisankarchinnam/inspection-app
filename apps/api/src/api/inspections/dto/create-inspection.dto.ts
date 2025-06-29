import { IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInspectionDto {
  @IsMongoId()
  @ApiProperty()
  propertyId: string;

  @IsString()
  @ApiProperty()
  propertyName: string;

  @IsMongoId()
  @ApiProperty()
  templateId: string;

  @IsString()
  @ApiProperty()
  templateName: string;
}
