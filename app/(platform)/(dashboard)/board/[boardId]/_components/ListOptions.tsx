"use client"

import FormButton from '@/components/form/FormButton'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/hooks/use-toast'
import { copyList } from '@/lib/actions/list/copy'
import { deleteList } from '@/lib/actions/list/delete'
import { useAction } from '@/lib/hooks/useAction'
import { ListModel } from '@prisma/client'
import { MoreHorizontal, X as XIcon } from 'lucide-react'
import { ElementRef, useRef } from 'react'

interface ListOptionsProps {
    list: ListModel,
    onAddCard: () => void
}

const ListOptions = ({ list, onAddCard }: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<"button">>(null);
    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: (data) => {
            toast({
                title: `List ${data.title} deleted!`,
            })
            closeRef.current?.click();
        },
        onError: (error) => {
            toast({
                title: "Something went wrong in deleting list",
                description: error,
                variant: "destructive",
            })
        }
    })

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: (data) => {
            toast({
                title: `List ${data.title} copied!`,
            })
            closeRef.current?.click();
        },
        onError: (error) => {
            toast({
                title: "Something went wrong in copying list",
                description: error,
                variant: "destructive",
            })
        }
    })

    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;
        executeDelete({ id, boardId});
    }

    const onCopyList = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;
        executeCopy({ id, boardId});
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='w-auto h-auto p-2' variant="ghost">
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='px-0 py-3 mx-1' side='bottom' align='start'>
                <div className="text-sm font-semibold text-center text-neutral-600 pb-4">
                    List Actions
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className="h-auto w-auto absolute top-2 right-2 text-neutral-600"
                        variant={'ghost'}>
                        <XIcon className='h-4 w-4' />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    variant="ghost"
                    className='rounded-none p-2 px-4 font-normal text-sm justify-start w-full h-auto'>
                    Add Card
                </Button>
                <form action={onCopyList}>
                    <input hidden name="id" id="id" value={list.id} />
                    <input hidden name="boardId" id="boardId" value={list.boardId} />
                    <FormButton
                        variant='ghost'
                        className='rounded-none p-2 px-4 font-normal text-sm justify-start w-full h-auto'
                    >Copy List
                    </FormButton>
                </form>
                <Separator className='my-2' />
                <form action={onDelete}>
                    <input hidden name="id" id="id" value={list.id} />
                    <input hidden name="boardId" id="boardId" value={list.boardId} />
                    <FormButton
                        variant='ghost'
                        className='rounded-none p-2 px-4 font-normal text-sm justify-start w-full h-auto'
                    >Delete this list...
                    </FormButton>
                </form>
                <Separator className='my-2' />
                {/* <div className="flex flex-col items-center justify-center w-full">
                    <Button
                        onClick={onDelete}
                        disabled={isLoading}
                        variant={'destructive'}
                        className='w-[90%] h-auto justify-start rounded-none p-2 px-4 font-normal text-sm'>
                        Delete List
                    </Button>
                </div> */}
            </PopoverContent>
        </Popover>
    )
}

export default ListOptions