"use server"

import { auth } from "@clerk/nextjs/server";
import { InputType, OutputType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteBoardSchema } from "./schema";
import { createSafeAction } from "@/lib/actions/createSafeAction";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = await auth();

    if(!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const {id} = data;
    let board;

    try {
     board = await db.boardModel.delete({
            where: {
                id,
                orgId
            },
        });
    } catch (error) {
        return {
            error: "Something went wrong"
        }
    }

    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoardSchema, handler);