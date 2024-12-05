"use client"

import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from '@/hooks/use-toast'
import { deleteBoard } from '@/lib/actions/board/delete'
import { useAction } from '@/lib/hooks/useAction'
import { MoreHorizontal, X as XIcon } from 'lucide-react'
import React from 'react'

interface BoardOptionsProps {
    id: string
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
    const { execute, isLoading } = useAction(deleteBoard, {
        onError: (error) => {
            toast({
                title: "Something went wrong",
                description: error,
                variant: "destructive",
            })
        }
    })

    const onDelete = () => {
        execute({id})
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='w-auto h-auto p-1' variant="transparent">
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='px-0 py-3 mx-1' side='bottom' align='start'>
                <div className="text-sm font-semibold text-center text-neutral-600 pb-4">
                    Board Actions
                </div>
                <PopoverClose asChild>
                    <Button
                        className="h-auto w-auto absolute top-2 right-2 text-neutral-600"
                        variant={'ghost'}>
                        <XIcon className='h-4 w-4' />
                    </Button>
                </PopoverClose>
                <div className="flex items-center justify-center w-full">
                    <Button
                        onClick={onDelete}
                        disabled={isLoading}
                        variant={'destructive'}
                        className='w-[90%] h-auto justify-start rounded-none p-2 px-4 font-normal text-sm'>
                        Delete Board
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default BoardOptions