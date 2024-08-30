import { Prisma } from "@prisma/client"
import z from "zod"
import PCCaseSchema from "./validation"

export type PCCaseWithComponent = Prisma.PCCaseGetPayload<{ include: { component: true } }>
export type PCCaseCreate = z.infer<typeof PCCaseSchema.PCCaseCreate>
export type PCCaseEdit = z.infer<typeof PCCaseSchema.PCCaseEdit>
