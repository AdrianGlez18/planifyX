import { Button } from "@/components/ui/button"
//import { deleteBoard } from "@/lib/actions/board.actions"
import { X as CloseIcon } from "lucide-react"

interface BoardInterface {
    id: string,
    title: string
}

const Board = ({ id, title }: BoardInterface) => {
    //const deleteBoardWithId = deleteBoard.bind(null, id)// () => { deleteBoard(id)}
    return (
        <form /* action={deleteBoardWithId} */ className="flex flex-col">
            <div className="bg-slate-200 rounded-md p-2 flex items-center gap-2">
                <p className="mx-4 font-bold">
                    {title}
                </p>
                <button type="submit" className="bg-red-300/80 rounded-full p-0.5
                cursor-pointer hover:bg-red-400 hover:scale-110 transition-all ">
                    <CloseIcon className="h-4 w-4" />
                </button>
            </div>
        </form>
    )
}

export default Board