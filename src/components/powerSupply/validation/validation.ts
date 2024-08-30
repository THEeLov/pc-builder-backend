import z from "zod"
import { componentCreate } from "../../base/validation/validation"

const PowerSupplyCreate = z.object({
    id: z.string().uuid().optional(),
    powerOutput: z.number(),
    efficiency: z.string(),
    formFactor: z.string(),
    component: componentCreate,
})

const PowerSupplyEdit = z.object({
    powerOutput: z.number().optional(),
    efficiency: z.string().optional(),
    formFactor: z.string().optional(),
})

const PowerSupplySchema = {
    PowerSupplyCreate,
    PowerSupplyEdit,
}

export default PowerSupplySchema
