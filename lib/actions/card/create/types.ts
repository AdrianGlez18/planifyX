import {z} from "zod";
import { CardModel } from "@prisma/client";
import { ActionState } from "@/lib/actions/createSafeAction";

import { CreateCardSchema } from "./schema";

export type InputType = z.infer<typeof CreateCardSchema>;
export type OutputType = ActionState<InputType, CardModel>;
