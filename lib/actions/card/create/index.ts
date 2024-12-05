"use server";

import { InputType, OutputType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateCardSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";
//TODO: Handle column-row system isntead of just columns

const create = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = await auth()

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const { title, boardId, listId } = data;

    let card;

    try {
        const list = await db.listModel.findUnique({
            where: {
                id: listId,
                boardId,
                board: {
                    orgId
                }
            }
        })

        if (!list) {
            return {
                error: "List not found"
            }
        }

        const lastCard = await db.cardModel.findFirst({
            where: {
                listId,
                list: {
                    boardId,
                }
            },
            orderBy: {
                order: "desc"
            },
            select: {
                order: true
            }
        })

        const newOrder = lastCard ? lastCard.order + 1 : 0;

        card = await db.cardModel.create({
            data: {
                title,
                listId,
                order: newOrder
            }
        })

    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: card }
}

export const createCard = createSafeAction(CreateCardSchema, create);