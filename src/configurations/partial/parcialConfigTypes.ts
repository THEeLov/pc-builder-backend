import {
    ConfigurationType,
    GPU,
    Motherboard,
    PCCase,
    PowerSupply,
    Prisma,
    Processor,
    RAM,
    Storage,
} from "@prisma/client"
import includeQuery from "../configurationQuery"

export type PartialConfigCreate = {
    configurationType: ConfigurationType
    motherboardId?: string
    processorId?: string
    gpuId?: string
    powerSupplyId?: string
    PCCaseId?: string
    rams?: { id: string }[]
    storages?: { id: string }[]
}

export type ParcialConfigWithComponent = Prisma.ParcialPCConfigurationGetPayload<{ include: typeof includeQuery }>

export type FullPartialConfig = {
    motherboard?: Motherboard
    processor?: Processor
    rams: RAM[]
    gpu?: GPU
    storages: Storage[]
    powerSupply?: PowerSupply
    pcCase?: PCCase
}
