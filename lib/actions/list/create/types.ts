import {z} from "zod";
import { ListModel } from "@prisma/client";
import { ActionState } from "@/lib/actions/createSafeAction";

import { CreateListSchema } from "./schema";

export type InputType = z.infer<typeof CreateListSchema>;
export type OutputType = ActionState<InputType, ListModel>;
