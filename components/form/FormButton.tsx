"use client"

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface FormButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"|"primary" | "transparent";

}

const FormButton = ({ children, disabled, className, variant = "default" }: FormButtonProps) => {

    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            className={className}
            disabled={pending || disabled}
            variant={variant}
            size="sm">
            {children}
        </Button>
    )
}

export default FormButton