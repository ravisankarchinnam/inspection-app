export enum InspectionStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export type AnswerValue = string | number | string[];

export type Answer = {
  _id?: string;
  questionId: string;
  value: AnswerValue;
  createdAt?: string;
  updatedAt?: string;
};

export type Inspection = {
  _id?: string;
  propertyId: string;
  propertyName: string;
  templateId: string;
  templateName: string;
  answers?: Answer[];
  createdAt?: string;
  updatedAt?: string;
  status?: InspectionStatus;
};
