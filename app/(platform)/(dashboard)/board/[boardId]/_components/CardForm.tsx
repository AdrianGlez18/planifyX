"use client";

import FormButton from "@/components/form/FormButton";
import FormTextArea from "@/components/form/FormTextArea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { createCard } from "@/lib/actions/card/create";
import { useAction } from "@/lib/hooks/useAction";
import { on } from "events";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, forwardRef, KeyboardEventHandler, useRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
    listId: string;
    enableEditing: () => void;
    disableEditing: () => void;
    isEditing: boolean
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
    listId,
    enableEditing,
    disableEditing,
    isEditing
}, ref) => {

    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const { execute, fieldErrors } = useAction(createCard, {
        onSuccess: (data) => {
            toast({
                title: "Card created",
            })
            formRef.current?.reset();
        },
        onError: (error) => {
            toast({
                title: "Something went wrong",
                description: error,
                variant: "destructive",
            })
        }
    });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") disableEditing();
    }

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string;
        const boardId = formData.get("boardId") as string;
        execute({ title, listId, boardId });
        //disableEditing();
    }

    if (isEditing) {
        return (
            <form
            ref={formRef}
                action={onSubmit}
                className="m-1 p-0.5 px-1 space-y-4">
                <FormTextArea
                    ref={ref}
                    id="title"
                    placeholder="Enter a title..."
                    onKeyDown={onTextareaKeyDown}
                    errors={fieldErrors ?? {}} />
                <input hidden id="listId" name="listId" value={listId} readOnly />
                <input hidden id="boardId" name="boardId" value={params.boardId} readOnly />
                <div className="flex items-center gap-x-1">
                    <FormButton>Add card</FormButton>
                    <Button onClick={disableEditing} size="sm" variant="ghost"><X className="h-4 w-4" /></Button>
                </div>
            </form>
        )
    }
    return (
        <div className="pt-2 px-2">
            <Button
                onClick={enableEditing}
                className="w-full h-auto p-2 justify-start text-muted-foreground text-sm"
                variant="ghost"
                size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add a card
            </Button>
        </div>
    )
})

CardForm.displayName = "CardForm"

export default CardForm