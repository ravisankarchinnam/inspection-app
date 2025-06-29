import { IsEnum } from 'class-validator';
import { InspectionStatus } from 'src/api/inspections/enums/inspection-status.enum';

export class UpdateInspectionStatusDto {
  @IsEnum(InspectionStatus)
  status: InspectionStatus;
}
