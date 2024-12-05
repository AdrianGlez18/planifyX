"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FormErrors from "./FormErrors";


interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  id,
  label,
  type = "text",
  placeholder,
  required,
  disabled,
  errors,
  className,
  defaultValue = "",
  onBlur
}, ref) => {
  const { pending } = useFormStatus();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {
          label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null
        }
        <Input
        onBlur={onBlur}
        defaultValue={defaultValue}
        ref={ref}
        name={id}
        placeholder={placeholder}
        type={type}
        disabled={pending || disabled}
        className={`text-sm px-2 py-1 h-7 ${className}`}
        aria-describedby={`${id}-error`}
        />
      </div>
      <FormErrors 
      id={id}
      errors={errors}/>
    </div>
  )
});

export default FormInput