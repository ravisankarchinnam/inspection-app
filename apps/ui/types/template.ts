export enum TemplateType {
  DATE = "DATE",
  STRING = "STRING",
  NUMBER = "NUMBER",
  SINGLE = "SINGLE",
  MULTI = "MULTI",
}

export type Question = {
  _id?: string;
  text: string;
  type: TemplateType;
  isRequired?: boolean;
  options?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type Template = {
  _id?: string;
  name: string;
  description?: string;
  questions: Question[];
  createdAt?: string;
  updatedAt?: string;
};
