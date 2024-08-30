import z from "zod"
import { componentCreate } from "../../base/validation/validation"

const MotherboardCreate = z.object({
    id: z.string().uuid().optional(),
    component: componentCreate,
    socket: z.string(),
    formFactor: z.string(),
    ramSlots: z.number(),
    ramType: z.string(),
    gpuInterface: z.string(),
    storageBusType: z.string(),
})

const MotherboardEdit = z.object({
    socket: z.string().optional(),
    formFactor: z.string().optional(),
    ramSlots: z.number().optional(),
    ramType: z.string().optional(),
    gpuInterface: z.string().optional(),
    storageBusType: z.string().optional(),
})

const MotherboardSchemas = {
    MotherboardCreate,
    MotherboardEdit,
}

export default MotherboardSchemas
