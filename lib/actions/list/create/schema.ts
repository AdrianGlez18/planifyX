import { z } from "zod";

export const CreateListSchema = z.object({
    title: z.string({
        required_error: "Title is required.",
        invalid_type_error: "Title text is required"
    }).min(2, {
        message: "Title must be at least 2 characters."
    }),
    boardId: z.string()
})