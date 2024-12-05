import BoardTitleForm from "./BoardTitleForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { BoardModel } from "@prisma/client";
import BoardOptions from "./BoardOptions";

interface BoardNavbarProps {
  board: BoardModel
}

const BoardNavbar = async ({ board }: BoardNavbarProps) => {
  const { orgId } = await auth();

  return (
    <div className="flex items-center w-full h-14 z-40 bg-black/40 fixed top-14 px-6 gap-4 text-white">
      <BoardTitleForm board={board} />
      <div className="ml-auto">
        <BoardOptions id={board.id} />
      </div>
    </div>
  )
}

export default BoardNavbar