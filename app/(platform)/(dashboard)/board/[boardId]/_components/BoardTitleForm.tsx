"use client"

import FormInput from "@/components/form/FormInput"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { updateBoard } from "@/lib/actions/board/update"
import { useAction } from "@/lib/hooks/useAction"
import { BoardModel } from "@prisma/client"
import { on } from "events"
import { ElementRef, useRef, useState } from "react"
import { date } from "zod"

interface BoardTitleFormProps {
    board: BoardModel
}

const BoardTitleForm = ({
    board
}: BoardTitleFormProps
) => {
    const { execute } = useAction(updateBoard, {
        onSuccess: (data) => {
            toast({
                title: `Board ${data.title} updated!`,
            })
            setCurrentTitle(data.title)
            disableEditing();
        },
        onError: (error) => {
            toast({
                title: "Something went wrong",
                description: error,
                variant: "destructive",
            })
        }
    });
    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)
    const [currentTitle, setCurrentTitle] = useState(board.title)
    const [isEditing, setIsEditing] = useState(false)

    const disableEditing = () => setIsEditing(false)
    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        }, 25)
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        if (title !== currentTitle) {
            execute({ id: board.id, title })
        } else {
            disableEditing()
        }
    }

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    if (isEditing) {
        return (
            <form action={onSubmit} ref={formRef} className="flex items-center gap-x-2">
                <FormInput
                    id="title"
                    ref={inputRef}
                    type="text"
                    onBlur={onBlur}
                    defaultValue={currentTitle}
                    className="text-lg font-bold px-2 h-7 bg-transparent md:text-lg
                focus-visible:outline-none focus-visible:ring-0 rounded-sm
                focus-visible:ring-transparent border-none focus-visible:ring-offset-0"
                />

            </form>
        )
    }
    return (
        <Button
            onClick={isEditing ? disableEditing : enableEditing}
            variant="transparent"
            className="font-bold h-auto w-auto text-lg px-2">
            {currentTitle}
        </Button>
    )
}

export default BoardTitleForm