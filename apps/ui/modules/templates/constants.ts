import { TemplateType } from "@/types/template";
import { Calendar, CheckSquare, Hash, Radio, Type } from "lucide-react";

export const questionTypeIcons = {
  [TemplateType.DATE]: Calendar,
  [TemplateType.STRING]: Type,
  [TemplateType.NUMBER]: Hash,
  [TemplateType.SINGLE]: Radio,
  [TemplateType.MULTI]: CheckSquare,
} as const;
