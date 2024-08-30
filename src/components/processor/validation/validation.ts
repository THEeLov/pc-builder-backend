import z from "zod"
import { componentCreate } from "../../base/validation/validation"

const ProcessorCreate = z.object({
    id: z.string().uuid().optional(),
    architecture: z.string(),
    cores: z.number(),
    threads: z.number(),
    bits: z.number(),
    socket: z.string(),
    component: componentCreate,
})

const ProcessorEdit = z.object({
    architecture: z.string().optional(),
    cores: z.number().optional(),
    threads: z.number().optional(),
    bits: z.number().optional(),
    socket: z.string().optional(),
})

const ProcessorSchema = {
    ProcessorCreate,
    ProcessorEdit,
}

export default ProcessorSchema
