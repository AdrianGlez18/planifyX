"use server"

import { auth } from "@clerk/nextjs/server";
import { InputType, OutputType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteListSchema } from "./schema";
import { createSafeAction } from "@/lib/actions/createSafeAction";
import { redirect } from "next/navigation";

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
        list = await db.listModel.delete({
            where: {
                id,
                boardId,
                board: {
                    orgId
                }
            },
        });
    } catch (error) {
        return {
            error: "Something went wrong"
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: list };
}

export const deleteList = createSafeAction(DeleteListSchema, handler);