import z from "zod"
import { configType } from "../../baseValidation"

const configIdSchema = z.object({
    configId: z.string().uuid(),
})

const createObject = z.object({
    configurationType: configType,
    motherboardId: z.string().uuid(),
    processorId: z.string().uuid(),
    gpuId: z.string().uuid(),
    powerSupplyId: z.string().uuid(),
    PCCaseId: z.string().uuid(),
    rams: z.array(z.object({ id: z.string().uuid() })).min(1),
    storages: z.array(z.object({ id: z.string().uuid() })).min(1),
})

const configValidation = {
    configIdSchema,
    createObject,
}

export default configValidation
