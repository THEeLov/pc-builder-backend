import z from "zod"
import { componentCreate } from "../../base/validation/validation"

const GPUCreate = z.object({
    id: z.string().uuid().optional(),
    memory: z.number(),
    powerConnector: z.string(),
    interface: z.string(),
    power: z.number(),
    component: componentCreate,
})

const GPUEdit = z.object({
    memory: z.number().optional(),
    powerConnector: z.string().optional(),
    interface: z.string().optional(),
    power: z.number().optional(),
})

const GPUSchema = {
    GPUCreate,
    GPUEdit,
}

export default GPUSchema
