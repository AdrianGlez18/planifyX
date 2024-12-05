"use server"

import { auth } from "@clerk/nextjs/server";
import { InputType, OutputType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateListSchema } from "./schema";
import { createSafeAction } from "@/lib/actions/createSafeAction";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const { title, id, boardId } = data;
    let list;

    try {
        list = await db.listModel.update({
            where: {
                id,
                boardId,
                board: {
                    orgId
                }
            },
            data: {
                title
            }
        });
    } catch (error) {
        return {
            error: "Something went wrong"
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: list };
}

export const updateList = createSafeAction(UpdateListSchema, handler);