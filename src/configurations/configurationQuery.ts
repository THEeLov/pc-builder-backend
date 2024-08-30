import { ConfigurationType } from "@prisma/client"

const includeQuery = {
    motherboard: {
        include: {
            component: true,
        },
    },
    processor: {
        include: {
            component: true,
        },
    },
    rams: {
        include: {
            component: true,
        },
    },
    gpu: {
        include: {
            component: true,
        },
    },
    storages: {
        include: {
            component: true,
        },
    },
    powerSupply: {
        include: {
            component: true,
        },
    },
    pcCase: {
        include: {
            component: true,
        },
    },
}

export type ParcialConfigEdit = {
    configurationType?: ConfigurationType
    motherboardId?: string | null
    processorId?: string | null
    gpuId?: string | null
    powerSupplyId?: string | null
    PCCaseId?: string | null
    ramId?: string
    storageId?: string
}

export type ConfigEdit = {
    configurationType?: ConfigurationType
    motherboardId?: string
    processorId?: string
    gpuId?: string
    powerSupplyId?: string
    PCCaseId?: string
    rams?: { id: string }[]
    storages?: { id: string }[]
}

export default includeQuery
