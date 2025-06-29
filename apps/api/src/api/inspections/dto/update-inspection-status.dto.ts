import { IsEnum } from 'class-validator';
import { InspectionStatus } from '../enums/inspection-status.enum';

export class UpdateInspectionStatusDto {
  @IsEnum(InspectionStatus)
  status: InspectionStatus;
}
