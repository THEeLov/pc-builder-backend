import { Prisma } from "@prisma/client"
import z from "zod"
import RamSchema from "./validation"

export type RamWithComponent = Prisma.RAMGetPayload<{ include: { component: true } }>
export type RamCreate = z.infer<typeof RamSchema.RamCreate>
export type RamEdit = z.infer<typeof RamSchema.RamEdit>
