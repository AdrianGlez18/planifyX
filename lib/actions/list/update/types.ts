import { z} from "zod";
import { UpdateListSchema } from "./schema";
import { ActionState } from "../../createSafeAction";
import {  ListModel } from "@prisma/client";

export type InputType = z.infer<typeof UpdateListSchema>
export type OutputType = ActionState<InputType, ListModel>