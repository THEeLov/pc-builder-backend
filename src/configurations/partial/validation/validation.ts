import z from "zod"
import { configType } from "../../baseValidation"

const createObject = z.object({
    configurationType: configType,
    motherboardId: z.string().uuid().optional(),
    processorId: z.string().uuid().optional(),
    gpuId: z.string().uuid().optional(),
    powerSupplyId: z.string().uuid().optional(),
    PCCaseId: z.string().uuid().optional(),
    ramId: z.string().uuid().optional(),
    storageId: z.string().uuid().optional(),
})

const fullUpdateObject = z.object({
    configurationType: configType.optional(),
    motherboardId: z.string().uuid().optional(),
    processorId: z.string().uuid().optional(),
    gpuId: z.string().uuid().optional(),
    powerSupplyId: z.string().uuid().optional(),
    PCCaseId: z.string().uuid().optional(),
    rams: z.array(z.object({ id: z.string() })).optional(),
    storages: z.array(z.object({ id: z.string() })).optional(),
})

const updateObject = z.object({
    delete: z.boolean(),
    configurationType: configType.optional(),
    motherboardId: z.string().uuid().optional().nullable(),
    processorId: z.string().uuid().optional().nullable(),
    gpuId: z.string().uuid().optional().nullable(),
    powerSupplyId: z.string().uuid().optional().nullable(),
    PCCaseId: z.string().uuid().optional().nullable(),
    ramId: z.string().uuid().optional(),
    storageId: z.string().uuid().optional(),
})

export type inputPConfigData = z.infer<typeof updateObject>

export const parcialConfigSchema = {
    updateObject,
    createObject,
    fullUpdateObject,
}
