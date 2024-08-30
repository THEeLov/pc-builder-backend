import { z } from "zod"
import ProcessorSchema from "./validation"
import { Prisma } from "@prisma/client"

export type ProcessorWithComponent = Prisma.ProcessorGetPayload<{ include: { component: true } }>
export type ProcessorCreate = z.infer<typeof ProcessorSchema.ProcessorCreate>
export type ProcessorEdit = z.infer<typeof ProcessorSchema.ProcessorEdit>
