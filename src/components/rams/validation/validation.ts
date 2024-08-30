import z from "zod"
import { componentCreate } from "../../base/validation/validation"
import { ComputerType } from "@prisma/client"

const computerType = z.enum(Object.values(ComputerType) as [ComputerType, ...ComputerType[]])

export const RamCreate = z.object({
    id: z.string().uuid().optional(),
    component: componentCreate,
    memoryType: z.string(),
    capacity: z.number(),
    computerType: computerType,
})

export const RamEdit = z.object({
    memoryType: z.string().optional(),
    capacity: z.number().optional(),
    computerType: computerType.optional(),
})

const RamSchema = {
    RamCreate,
    RamEdit,
}

export default RamSchema
