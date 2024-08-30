import { Result } from "@badrap/result"
import { prisma } from "../../../client"
import { PartialConfigCreate } from "../parcialConfigTypes"
import handleError from "../../../utils"
import { DbResult } from "../../../../types"
import includeQuery, { ParcialConfigEdit } from "../../configurationQuery"
import { ParcialConfigWithComponent } from "../parcialConfigTypes"

async function create(userId: string, createObj: PartialConfigCreate): DbResult<ParcialConfigWithComponent> {
    try {
        const newConfig = await prisma.parcialPCConfiguration.create({
            data: {
                ...createObj,
                userId,
                rams: {
                    connect: createObj.rams,
                },
                storages: {
                    connect: createObj.storages,
                },
            },
            include: includeQuery,
        })
        return Result.ok(newConfig)
    } catch (e) {
        return handleError(e, "at create partial config")
    }
}

async function update(userId: string, data: ParcialConfigEdit): DbResult<ParcialConfigWithComponent> {
    try {
        const config = await prisma.parcialPCConfiguration.update({
            where: {
                userId,
            },
            data: {
                configurationType: data.configurationType,
                motherboardId: data.motherboardId,
                processorId: data.processorId,
                gpuId: data.gpuId,
                pcCaseId: data.PCCaseId,
                powerSupplyId: data.powerSupplyId,
                storages: {
                    connect: data.storageId ? { id: data.storageId } : undefined,
                },
                rams: {
                    connect: data.ramId ? { id: data.ramId } : undefined,
                },
            },
            include: includeQuery,
        })
        return Result.ok(config)
    } catch (e) {
        console.log(e)
        return handleError(e, "at update partial config")
    }
}

async function removeComponent(userId: string, data: ParcialConfigEdit): DbResult<ParcialConfigWithComponent> {
    try {
        const config = await prisma.parcialPCConfiguration.update({
            where: {
                userId,
            },
            data: {
                motherboardId: data.motherboardId,
                processorId: data.processorId,
                powerSupplyId: data.powerSupplyId,
                pcCaseId: data.PCCaseId,
                gpuId: data.gpuId,
                storages: {
                    disconnect: data.storageId ? { id: data.storageId } : undefined,
                },
                rams: {
                    disconnect: data.ramId ? { id: data.ramId } : undefined,
                },
            },
            include: includeQuery,
        })
        return Result.ok(config)
    } catch (e) {
        console.log(e)
        return handleError(e, "in rams or storage cparcialconfig delete")
    }
}

async function remove(userId: string): DbResult<void> {
    try {
        await prisma.parcialPCConfiguration.delete({
            where: {
                userId,
            },
        })
        return Result.ok(undefined)
    } catch (e) {
        return handleError(e, "at partial config delete")
    }
}

async function get(userId: string): DbResult<ParcialConfigWithComponent> {
    try {
        const config = await prisma.parcialPCConfiguration.findFirstOrThrow({
            where: {
                userId,
            },
            include: includeQuery,
        })
        return Result.ok(config)
    } catch (e) {
        return handleError(e, "at parcial config get")
    }
}

export const ParcialConfigurationRepository = {
    create,
    update,
    remove,
    get,
    removeComponent,
}
