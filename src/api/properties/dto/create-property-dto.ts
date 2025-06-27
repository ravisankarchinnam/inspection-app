import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  ValidateNested,
  IsObject,
  IsNotEmpty,
} from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postalCode: string;
}

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  @ApiProperty({ type: AddressDto })
  address: AddressDto;
}
