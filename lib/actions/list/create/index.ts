"use server";

import { InputType, OutputType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateListSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";
//TODO: Handle column-row system isntead of just columns

const create = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = await auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const { title, boardId } = data;

    let list;

    try {
        const board = await db.boardModel.findUnique({
            where: {
                id: boardId,
                orgId
            }
        })

        if (!board) {
            return {
                error: "Board not found"
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
                column: 'desc'
            },
            select: {
                column: true
            }
        })

        const newColumn = lastList ? lastList.column + 1 : 0

        list = await db.listModel.create({
            data: {
                title,
                boardId,
                row: 0,
                column: newColumn
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list }
}

export const createList = createSafeAction(CreateListSchema, create);