"use client"

import FormInput from "@/components/form/FormInput"
import { toast } from "@/hooks/use-toast"
import { updateList } from "@/lib/actions/list/update"
import { useAction } from "@/lib/hooks/useAction"
import { ListModel } from "@prisma/client"
import { ElementRef, useRef, useState } from "react"
import { useEventListener } from "usehooks-ts"
import ListOptions from "./ListOptions"

interface ListHeaderProps {
    list: ListModel,
    onAddCard: () => void
}

const ListHeader = ({ list, onAddCard }: ListHeaderProps) => {

    const [title, setTitle] = useState(list.title);
    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 25);
    }

    const disableEditing = () => setIsEditing(false);

    const {execute} = useAction(updateList, {
        onSuccess: (data) => {
            toast({
                title: `List ${data.title} updated!`,
            })
            setTitle(data.title);
            disableEditing();
        },
        onError: (error) => {
            toast({
                title: "Something went wrong",
                description: error,
                variant: "destructive",
            })
        }
    })

    const onSubmit = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;
        const title = formData.get("title") as string;

        if(title === list.title) {
            return disableEditing();
        }
        execute({ id, boardId, title });
    }

    const onBlur = () => {
        formRef.current?.requestSubmit();
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") formRef.current?.requestSubmit();
    }

    useEventListener("keydown", onKeyDown);
    return (
        <div className="pt-2 px-2 text-sm font-semibold text-gray-900 flex items-start justify-between">
            {
                isEditing ? (
                <form ref={formRef} action={onSubmit} className="flex-1 px-0.5">
                    <FormInput
                        ref={inputRef}
                        id="title"
                        onBlur={onBlur}
                        placeholder="Enter list title"
                        defaultValue={title}
                        className="text-sm px-2 py-1 h-7 font-medium border-transparent
                        hover:border-input focus:border-input transition truncate
                        bg-transparent focus:bg-white"
                        />
                    <input hidden id="id" name="id" defaultValue={list.id} />
                    <input hidden id="boardId" name="boardId" defaultValue={list.boardId} />
                    <button hidden type="submit" className="hidden"/>
                </form>
            ) : (
                    <div onClick={enableEditing} className=" cursor-pointer w-full text-sm px-2 5 py-1 h-7 font-medium border-transparent">
                        {title}
                    </div>
                )
            }
            <ListOptions list={list} onAddCard={onAddCard}/>
        </div>
    )
}

export default ListHeader