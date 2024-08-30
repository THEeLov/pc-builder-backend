import z from "zod"
import { Prisma } from "@prisma/client"
import PowerSupplySchema from "./validation"

export type PowerSupplyWithComponent = Prisma.PowerSupplyGetPayload<{ include: { component: true } }>
export type PowerSupplyCreate = z.infer<typeof PowerSupplySchema.PowerSupplyCreate>
export type PowerSupplyEdit = z.infer<typeof PowerSupplySchema.PowerSupplyEdit>
