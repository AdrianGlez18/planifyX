import { db } from "@/lib/db";
import Board from "./_components/Board";
import BoardForm from "./_components/BoardForm";
import OrganizationInfo from "@/components/layout/OrganizationInfo";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/BoardList";
import { Suspense } from "react";

const OrganizationIdPage = async () => {
  //const boards = await db.boardModel.findMany();

  return (
   <div className="w-full">
    <OrganizationInfo/>
    <Separator className="my-4"/>
    <div className="px-2 md:px-4">
      <Suspense fallback={<BoardList.Skeleton />}>
      <BoardList/>
      </Suspense>
    </div>
   </div>
  )
}

export default OrganizationIdPage

{/* <div className="flex gap-4">
{boards.map((board) => (
  <div key={board.id} className="flex flex-col gap-8 p-2">
    <Board key={board.id} id={board.id} title={board.title} />

  </div>
))}
<BoardForm />
</div> */}