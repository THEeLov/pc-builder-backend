import { ConfigurationType, Prisma } from "@prisma/client"
import includeQuery from "../configurationQuery"

//ZOD musi zvalidovat ze ci rams a storages maju aspon 1 položku.
export type ConfigurationCreate = {
    id?: string
    configurationType: ConfigurationType
    motherboardId: string
    processorId: string
    gpuId: string
    powerSupplyId: string
    PCCaseId: string
    rams: { id: string }[]
    storages: { id: string }[]
}

export type ConfigurationWithComponent = Prisma.PCConfigurationGetPayload<{ include: typeof includeQuery }>
