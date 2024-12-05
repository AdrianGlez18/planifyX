import { z} from "zod";
import { DeleteListSchema } from "./schema";
import { ActionState } from "../../createSafeAction";
import { ListModel } from "@prisma/client";

export type InputType = z.infer<typeof DeleteListSchema>
export type OutputType = ActionState<InputType, ListModel>