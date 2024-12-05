"use client"

import { Button } from "@/components/ui/button"
import ListWrapper from "./ListWrapper"
import { Plus, X } from "lucide-react"
import { ElementRef, useRef, useState } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import FormInput from "@/components/form/FormInput"
import { useParams, useRouter } from "next/navigation"
import FormButton from "@/components/form/FormButton"
import { useAction } from "@/lib/hooks/useAction"
import { createList } from "@/lib/actions/list/create"
import { toast } from "@/hooks/use-toast"

const ListForm = () => {
    const router = useRouter();
    const params = useParams();
    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 25);
    }

    const disableEditing = () => setIsEditing(false);

    const { execute, fieldErrors } = useAction(createList, {
        onSuccess: (data) => {
            console.log(data);
            toast({
                title: `List ${data.title} created!`,
            })
            disableEditing();
            router.refresh();
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: "Unable to create list",
                description: error,
                variant: "destructive",
            })
        }
    })

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") disableEditing();
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;

        execute({ title, boardId });
    }

    if (isEditing) {
        return (
            <ListWrapper>
                <form
                    action={onSubmit}
                    ref={formRef}
                    className="w-full rounded-md bg-white/80 hover:bg-white/60 transition
                p-3 text-sm text-neutral-700 space-y-4">
                    <FormInput
                        ref={inputRef}
                        errors={fieldErrors}
                        id="title"
                        type="text"
                        placeholder="Enter a list title"
                        className="text-sm px-2 h-7 font-medium text-neutral-700
                    border-transparent focus:border-transparent focus:ring-0
                    focurs:ring-offset-0"/>
                    <input hidden defaultValue={params.boardId} name="boardId" />
                    <div className="flex items-center gap-x-1">
                        <FormButton variant="primary">Add List</FormButton>
                        <Button onClick={disableEditing} size="sm" variant="ghost">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>

            <button
                onClick={enableEditing}
                className="w-full rounded-md bg-white/80 hover:bg-white/60 transition
            p-3 flex items-center gap-2 font-medium text-sm text-neutral-700">
                <Plus className="h-4 w-4" />
                Create List</button>
        </ListWrapper>
    )
}


export default ListForm;