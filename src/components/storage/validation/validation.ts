import z from "zod"
import { componentCreate } from "../../base/validation/validation"

const StorageCreate = z.object({
    id: z.string().uuid().optional(),
    storageType: z.string(),
    capacity: z.number(),
    busType: z.string(),
    component: componentCreate,
})

const StorageEdit = z.object({
    storageType: z.string().optional(),
    capacity: z.number().optional(),
    busType: z.string().optional(),
})

const StorageSchema = {
    StorageCreate,
    StorageEdit,
}

export default StorageSchema
