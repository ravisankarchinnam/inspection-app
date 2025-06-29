import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function FormInput({
  label,
  value,
  onChange,
  name,
  placeholder,
  disabled,
}: { label: string } & React.ComponentProps<"input">) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={disabled}
      />
    </div>
  );
}
