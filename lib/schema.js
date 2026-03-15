import { z } from "zod";

export const accountSchema = z.object({
    name: z.string().min(1, "NAME IS REQUIRED"),
    type: z.enum(["CURRENT", "SAVING"]),
    balance: z.string().min(1, "INITIAL BALANCE IS REQUIRED"),
    isDefault: z.boolean().default(false)
})