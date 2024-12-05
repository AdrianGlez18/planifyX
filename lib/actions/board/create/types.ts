import {z} from "zod";
import { BoardModel } from "@prisma/client";
import { ActionState } from "@/lib/actions/createSafeAction";

import { BoardZodSchema } from "./schema";

export type InputType = z.infer<typeof BoardZodSchema>;
export type OutputType = ActionState<InputType, BoardModel>;
