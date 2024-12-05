"use client";

import { forwardRef, KeyboardEventHandler } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import FormErrors from "./FormErrors";

interface FormTextAreaProps {
    id: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors: Record<string, string[] | undefined>;
    className?: string;
    defaultValue?: string;
    onBlur?: () => void
    onClick?: () => void
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(({
    id,
    label,
    placeholder,
    required,
    disabled,
    errors,
    className,
    defaultValue = "",
    onBlur,
    onClick,
    onKeyDown
}, ref) => {
    const { pending } = useFormStatus();
    return (
        <div className="space-y-2 w-full">
            <div className="space-y w-full">
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
                <Textarea
                    id={id}
                    name={id}
                    ref={ref}
                    required={required}
                    disabled={pending || disabled}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={cn(
                        "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
                        className
                    )}
                    aria-describedby={`${id}-error`}
                    defaultValue={defaultValue}/>
    
            </div>
            <FormErrors id={id} errors={errors} />
        </div>
    )
})

FormTextArea.displayName = "FormTextArea"

export default FormTextArea