import { z} from "zod";
import { DeleteBoardSchema } from "./schema";
import { ActionState } from "../../createSafeAction";
import { BoardModel } from "@prisma/client";

export type InputType = z.infer<typeof DeleteBoardSchema>
export type OutputType = ActionState<InputType, BoardModel>