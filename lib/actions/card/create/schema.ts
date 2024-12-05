import { z } from "zod";

export const CreateCardSchema = z.object({
    title: z.string({
        required_error: "Title is required.",
        invalid_type_error: "Title text is required"
    }),
    boardId: z.string(),
    listId: z.string()
})