import { ControllerRenderProps, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question, Template, TemplateType } from "@/types/template";
import {
  Answer,
  AnswerValue,
  Inspection,
  InspectionStatus,
} from "@/types/inspection";
import { Label } from "@/components/ui/label";
import { Ref } from "react";
import { Select, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function buildFormSchema(questions: Question[]) {
  const shape: z.ZodRawShape = {};
  questions.forEach((q) => {
    if (!q._id) {
      return;
    }
    switch (q.type) {
      case TemplateType.STRING:
        shape[q._id] = z.string().min(1, { message: "Required" });
        break;
      case TemplateType.NUMBER:
        shape[q._id] = z
          .union([z.string(), z.number()])
          .refine((val) => !isNaN(Number(val)), {
            message: "Must be a number",
          });
        break;
      case TemplateType.MULTI:
        shape[q._id] = z
          .array(z.string())
          .min(1, { message: "Select at least one" });
        break;
      case TemplateType.SINGLE:
        shape[q._id] = z.string().min(1, { message: "Select an option" });
        break;
      case TemplateType.DATE:
        shape[q._id] = z.string().min(1, { message: "Required" });
        break;
      default:
        shape[q._id] = z.any();
    }
  });
  return z.object(shape);
}

function QNAElement({
  id,
  type,
  field,
  placeholder,
  options,
}: {
  id?: string;
  field: ControllerRenderProps<Record<string, AnswerValue>, string>;
  options?: string[];
  type: TemplateType;
  placeholder?: string;
}) {
  switch (type) {
    case TemplateType.STRING:
      return <Input type="text" {...field} placeholder={placeholder} />;

    case TemplateType.NUMBER:
      return (
        <Input
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))}
          placeholder={placeholder}
        />
      );

    case TemplateType.DATE:
      return <Input type="date" {...field} />;

    case TemplateType.MULTI:
      return (
        <div className="flex flex-col gap-2">
          {options?.map((opt) => (
            <label key={opt} className="flex items-center gap-2">
              <Checkbox
                checked={
                  (field.value as string | string[])?.includes(opt) || false
                }
                onCheckedChange={(checked: boolean) => {
                  const newValue = Array.isArray(field.value)
                    ? [...field.value]
                    : [];
                  if (checked) {
                    newValue.push(opt);
                  } else {
                    const idx = newValue.indexOf(opt);
                    if (idx > -1) newValue.splice(idx, 1);
                  }
                  field.onChange(newValue);
                }}
              />
              {opt}
            </label>
          ))}
        </div>
      );

    case TemplateType.SINGLE:
      return (
        <RadioGroup
          value={field.value}
          onValueChange={field.onChange}
          className="flex flex-col gap-2"
        >
          {options?.map((opt) => (
            <div key={opt} className="flex flex-row">
              <RadioGroupItem value={opt} id={`${id}-${opt}`} />
              <Label htmlFor={`${id}-${opt}`} className="ml-2">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );

    default:
      return (
        <Select {...field}>
          {options?.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </Select>
      );
  }
}

function QNAElements({
  questions,
  form,
}: {
  questions: Question[];
  form: UseFormReturn<
    Record<string, AnswerValue>,
    AnswerValue,
    Record<string, AnswerValue>
  >;
}) {
  return questions.map((q) => (
    <FormField
      key={q._id}
      control={form.control}
      name={q._id!}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{q.text}</FormLabel>
          <FormControl>
            <QNAElement
              type={q.type}
              options={q.options}
              id={q._id}
              field={field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ));
}

export function InspectionQNAForm({
  template,
  inspection,
  formRef,
  onSubmit,
}: {
  formRef?: Ref<HTMLFormElement>;
  template: Template;
  inspection: Inspection;
  onSubmit: (answers: Answer[]) => void;
}) {
  const formSchema = buildFormSchema(template.questions);

  const defaultValues: Record<string, AnswerValue> = {};

  if (inspection?.answers) {
    inspection.answers.forEach((ans) => {
      defaultValues[ans.questionId] = ans.value;
    });
  }

  const form = useForm<Record<string, AnswerValue>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (data: Record<string, AnswerValue>) => {
    const answers = template.questions.map((q) => ({
      questionId: q._id!,
      value: data[q._id!],
    }));
    onSubmit(answers);
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <QNAElements questions={template.questions} form={form} />
        {inspection.status !== InspectionStatus.COMPLETED && (
          <Button type="submit">Save</Button>
        )}
      </form>
    </Form>
  );
}
