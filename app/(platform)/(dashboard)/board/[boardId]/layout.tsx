import BoardNavbar from './_components/BoardNavbar';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation';
import React from 'react'

export function generateMetadata() {
    return {
        title: 'Board',
    }
}

const BoardIdLayout = async ({
    children, params
}: {
    children: React.ReactNode,
    params: { boardId: string }
}) => {
    const { orgId} = await auth();

    if(!orgId) redirect('/select-org');

    const board = await db.boardModel.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    });

    if (!board) {
        notFound();
    }

    return (
        <div 
        className="relative h-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${board.imageFullUrl})` }}>
            <BoardNavbar board={board}/>
            <div className="absolute inset-0 bg-black/20"/>
            <main className='h-full pt-28 relative'>
            {children}
        </main>
        </div>
    )
}

export default BoardIdLayout
