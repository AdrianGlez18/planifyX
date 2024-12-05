import FormPopover from "@/components/form/FormPopover"
import Hint from "@/components/shared/Hint"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { HelpCircle, User2 } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"


const BoardList = async () => {
    const { orgId } = await auth()

    if (!orgId) {
        return redirect("/select-org")
    }

    const boards = await db.boardModel.findMany({ where: { orgId }, orderBy: { createdAt: "desc" } })
    return (
        <div className="h-full space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2" />
                Your Boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {
                    boards.map((board) => (
                        <Link
                            key={board.id}
                            href={`/board/${board.id}`}
                            className="group aspect-video relative h-full w-full bg-blue-600
                        rounded-md bg-no-repeat bg-center bg-cover flex flex-col gap-1 
                        items-center justify-center p-2 overflow-hidden"
                            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}>
                            <div className="p-1 absolute inset-0 bg-black/10 group-hover:bg-black/40 transition">
                                <p className="relative font-semibold ml-1 text-white">
                                    {board.title}
                                </p>
                            </div>
                        </Link>
                    ))
                }
                <div className="flex sm:hidden">
                    <FormPopover sideOffset={10} side="bottom">
                        <div role="button" className="aspect-video relative h-full w-full bg-muted rounded-md flex flex-col
                    gap-1 items-center justify-center hover:opacity-75 transition-all">
                            <p className="text-sm">Create new board</p>
                            <span className="text-xs text-gray-500">10 remaining</span>
                            <Hint
                                offset={20}
                                description="Free workspaces can have up to 10 boards. Upgrade for more.">
                                <HelpCircle className="absolute bottom-2 right-2 h-4 w-4" />
                            </Hint>
                        </div>
                    </FormPopover>
                </div>
                <div className="hidden sm:flex">
                    <FormPopover sideOffset={10} side="right">
                        <div role="button" className="aspect-video relative h-full w-full bg-muted rounded-md flex flex-col
                    gap-1 items-center justify-center hover:opacity-75 transition-all">
                            <p className="text-sm">Create new board</p>
                            <span className="text-xs text-gray-500">10 remaining</span>
                            <Hint
                                offset={20}
                                description="Free workspaces can have up to 10 boards. Upgrade for more.">
                                <HelpCircle className="absolute bottom-2 right-2 h-4 w-4" />
                            </Hint>
                        </div>
                    </FormPopover>
                </div>
            </div>
        </div>
    )
}

export default BoardList

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="h-full space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2" />
                <Skeleton className="h-4 w-[100px]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="aspect-video w-full" />
            </div>
        </div>
    )
}