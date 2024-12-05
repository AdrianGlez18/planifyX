"use server";

import { InputType, OutputType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { BoardZodSchema } from "./schema";
import { createSafeAction } from "../../createSafeAction";


const create = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = await auth()

    if(!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const {title, image} = data;

    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUsername] = image.split("|");
console.log(imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUsername)
    if(!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHtml || !imageUsername) {
        return {
            error: "Invalid image data"
        }
    }

    let board;

    try {
        board = await db.boardModel.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageLinkHtml,
                imageUsername
            }
        })
    } catch (error) {
        return {
            error: "Internal database error"
        }
    }

    revalidatePath(`/board/${board.id}`);
    return {data: board}
}

export const createBoard = createSafeAction(BoardZodSchema, create);