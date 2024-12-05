"use client"

import { X as XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { useAction } from "@/lib/hooks/useAction";
import { createBoard } from "@/lib/actions/board/create";
import { useToast } from "@/hooks/use-toast";
import FormImagePicker from "./FormImagePicker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number
}

const FormPopover = ({
    children,
    side = "bottom",
    align = "center",
    sideOffset = 0
}: FormPopoverProps) => {
    const router = useRouter();
    const { toast } = useToast()
    const closeRef = useRef<ElementRef<"button">>(null);
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            toast({
                variant: "create",
                title: "Board created",
            })
            closeRef.current?.click();
            router.push(`/board/${data.id}`);
        },
        onError: (error) => {
            console.error({ error });
        }
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;

        execute({ title, image });
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent side={side} align={align} sideOffset={sideOffset} className="w-80 py-2">
                <div className="text-sm font-medium text-center text-neutral-600 py-2">
                    Create board
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className="w-auto h-auto absolute top-2 right-2 text-neutral-600"
                        variant={"ghost"}>
                        <XIcon className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormImagePicker
                            id="image"
                            errors={fieldErrors}
                        />
                        <FormInput id="title" label="Board Title" type="text" errors={fieldErrors} />
                    </div>
                    <FormButton className="w-full">
                        Create
                    </FormButton>
                </form>
            </PopoverContent>

        </Popover>
    )
}

export default FormPopover