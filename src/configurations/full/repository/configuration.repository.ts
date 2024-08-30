import { prisma } from "../../../client"
import { ConfigurationCreate, ConfigurationWithComponent } from "../configurationTypes"
import { DbResult } from "../../../../types"
import handleError from "../../../utils"
import { Result } from "@badrap/result"
import includeQuery, { ConfigEdit, ParcialConfigEdit } from "../../configurationQuery"

async function create(userId: string, data: ConfigurationCreate): DbResult<ConfigurationWithComponent> {
    try {
        const config = await prisma.$transaction(async (prisma) => {
            const config = await prisma.pCConfiguration.create({
                data: {
                    id: data.id,
                    configurationType: data.configurationType,
                    motherboardId: data.motherboardId,
                    processorId: data.processorId,
                    gpuId: data.gpuId,
                    powerSupplyId: data.powerSupplyId,
                    pcCaseId: data.PCCaseId,
                    userId: userId,
                    totalPrice: 0,
                    storages: {
                        connect: data.storages,
                    },
                    rams: {
                        connect: data.rams,
                    },
                },
                include: includeQuery,
            })
            const price =
                config.motherboard.component.price +
                config.processor.component.price +
                config.gpu.component.price +
                config.powerSupply.component.price +
                config.pcCase.component.price +
                config.rams.reduce((total, ram) => total + ram.component.price, 0) +
                config.storages.reduce((total, storage) => total + storage.component.price, 0)
            const cfg = await prisma.pCConfiguration.update({
                where: {
                    id: config.id,
                },
                data: {
                    totalPrice: price,
                },
                include: includeQuery,
            })
            return cfg
        })
        return Result.ok(config)
    } catch (e) {
        return handleError(e, "in config create")
    }
}

async function update(configId: string, data: ConfigEdit): DbResult<ConfigurationWithComponent> {
    try {
        const config = await prisma.$transaction(async (prisma) => {
            const config = await prisma.pCConfiguration.update({
                where: {
                    id: configId,
                },
                data: {
                    configurationType: data.configurationType,
                    motherboardId: data.motherboardId,
                    processorId: data.processorId,
                    gpuId: data.gpuId,
                    powerSupplyId: data.powerSupplyId,
                    pcCaseId: data.PCCaseId,
                    rams: {
                        set: data.rams,
                    },
                    storages: {
                        set: data.storages,
                    },
                },
                include: includeQuery,
            })
            const price =
                config.motherboard.component.price +
                config.processor.component.price +
                config.gpu.component.price +
                config.powerSupply.component.price +
                config.pcCase.component.price +
                config.rams.reduce((total, ram) => total + ram.component.price, 0) +
                config.storages.reduce((total, storage) => total + storage.component.price, 0)
            const configWithPrice = await prisma.pCConfiguration.update({
                where: {
                    id: configId,
                },
                data: {
                    totalPrice: price,
                },
                include: includeQuery,
            })
            return configWithPrice
        })
        return Result.ok(config)
    } catch (e) {
        return handleError(e, "at config update")
    }
}

async function get(configId: string) {
    try {
        const config = await prisma.pCConfiguration.findFirstOrThrow({
            where: {
                id: configId,
            },
            include: includeQuery,
        })
        return Result.ok(config)
    } catch (e) {
        return handleError(e, "at config get")
    }
}

async function getMany(userId: string): DbResult<ConfigurationWithComponent[]> {
    try {
        const configs = await prisma.pCConfiguration.findMany({
            where: {
                userId,
            },
            include: includeQuery,
        })
        return Result.ok(configs)
    } catch (e) {
        return handleError(e, "at getmany configs")
    }
}

async function remove(configId: string): DbResult<void> {
    try {
        await prisma.pCConfiguration.delete({
            where: {
                id: configId,
            },
        })
        return Result.ok(undefined)
    } catch (e) {
        return handleError(e, "at config delete")
    }
}

const configurationRepository = {
    create,
    update,
    get,
    getMany,
    remove,
}

export default configurationRepository
