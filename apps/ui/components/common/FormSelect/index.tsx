import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Option = { label: string; value: string };

export type FormSelectProps = {
  label: string;
  value: string;
  options: Option[];
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (value: string) => void;
};

export default function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  fullWidth,
}: FormSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Select
        value={value}
        onValueChange={(value: string) => onChange?.(value)}
      >
        <SelectTrigger className={fullWidth && "w-full"}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
