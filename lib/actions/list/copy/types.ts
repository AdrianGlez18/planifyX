import { z} from "zod";
import { CopyListSchema } from "./schema";
import { ActionState } from "../../createSafeAction";
import { ListModel } from "@prisma/client";

export type InputType = z.infer<typeof CopyListSchema>
export type OutputType = ActionState<InputType, ListModel>