import ComponentQuery from "./query.type"
import { FullPartialConfig } from "../../configurations/partial/parcialConfigTypes"
import { Prisma } from "@prisma/client"
import includeQuery from "../../configurations/configurationQuery"

export function convertConfig(config: Prisma.ParcialPCConfigurationGetPayload<{ include: typeof includeQuery }>) {
    const returnObj: FullPartialConfig = {
        motherboard: config.motherboard ?? undefined,
        processor: config.processor ?? undefined,
        rams: config.rams,
        gpu: config.gpu ?? undefined,
        storages: config.storages,
        powerSupply: config.powerSupply ?? undefined,
        pcCase: config.pcCase ?? undefined,
    }
    return returnObj
}

export function convertConfigurationToQueryType(configuration: FullPartialConfig): ComponentQuery {
    const query: ComponentQuery = {
        socket: undefined,
        formFactor: undefined,
        ramSlots: undefined,
        ramType: undefined,
        gpuInterface: undefined,
        storageBusType: undefined,
        powerIO: undefined,
    }
    if (configuration.motherboard) {
        query.socket = configuration.motherboard.socket
        query.formFactor = configuration.motherboard.formFactor
        query.ramType = configuration.motherboard.ramType
        query.gpuInterface = configuration.motherboard.gpuInterface
        query.storageBusType = configuration.motherboard.stroageBusType
    }
    if (configuration.gpu) {
        query.gpuInterface = configuration.gpu.interface
        query.powerIO = configuration.gpu.power
    }
    if (configuration.pcCase) {
        query.formFactor = configuration.pcCase.formFactor
    }
    if (configuration.powerSupply) {
        query.powerIO = configuration.powerSupply.powerOutput
        query.formFactor = configuration.powerSupply.formFactor
    }
    if (configuration.processor) {
        query.socket = configuration.processor.socket
    }
    if (configuration.rams.length > 0) {
        query.ramType = configuration.rams[0].memoryType
        query.ramSlots = { gte: configuration.rams.length }
    }
    if (configuration.storages.length > 0) {
        query.storageBusType = configuration.storages[0].busType
    }
    return query
}
