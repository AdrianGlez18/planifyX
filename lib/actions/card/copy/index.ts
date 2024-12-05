"use server"

import { auth } from "@clerk/nextjs/server";
import { InputType, OutputType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CopyListSchema } from "./schema";
import { createSafeAction } from "@/lib/actions/createSafeAction";
//TODO: Handle column-row system isntead of just columns

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const { id, boardId } = data;
    let list;

    try {
        const listToCopy = await db.listModel.findUnique({
            where: {
                id,
                boardId,
                board: {
                    orgId
                }
            },
            include: {
                cards: true
            }
        });

        if (!listToCopy) {
            return {
                error: "List not found"
            }
        }

        const lastList = await db.listModel.findFirst({
            where: {
                boardId,
                board: {
                    orgId
                }
            },
            orderBy: {
                column: "desc"
            },
            select: {
                column: true
            }
        });

        const newColumn = lastList ? lastList.column + 1 : 0;

        list = await db.listModel.create({
            data: {
                title: `${listToCopy.title} Copy`,
                boardId,
                column: newColumn,
                row: 0,
                cards: {
                    createMany: {
                        data: listToCopy.cards.map((card) => ({
                            title: card.title,
                            description: card.description,
                            order: card.order
                        }))
                    }
                }
            },
            include: {
                cards: true
            }
        });
        
    } catch (error) {
        return {
            error: "Something went wrong while copying the list"
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: list };
}

export const copyList = createSafeAction(CopyListSchema, handler);