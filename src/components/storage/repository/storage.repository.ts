import { prisma } from "../../../client"
import { DbResult } from "../../../../types"
import { Result } from "@badrap/result"
import { StorageCreate, StorageEdit, StorageWithComponent } from "../validation/storage.types"
import handleError from "../../../utils"
import ComponentQuery from "../../universal_types/query.type"

async function create(createObj: StorageCreate): DbResult<StorageWithComponent> {
    try {
        const storage = await prisma.$transaction(async () => {
            const component = await prisma.component.create({
                data: createObj.component,
            })
            const storage = await prisma.storage.create({
                data: {
                    id: createObj.id,
                    storageType: createObj.storageType,
                    capacity: createObj.capacity,
                    busType: createObj.busType,
                    componentId: component.id,
                },
                include: {
                    component: true,
                },
            })
            return storage
        })
        return Result.ok(storage)
    } catch (e) {
        return handleError(e, "in storage create")
    }
}

async function getMany(query: ComponentQuery): DbResult<StorageWithComponent[]> {
    try {
        const storages = await prisma.storage.findMany({
            where: {
                busType: query.storageBusType,
                component: {
                    price: {
                        gte: query.minPrice,
                        lte: query.maxPrice,
                    },
                },
            },
            include: {
                component: true,
            },
        })
        return Result.ok(storages)
    } catch (e) {
        return handleError(e, "in storage FindMany")
    }
}

async function getSingle(id: string): DbResult<StorageWithComponent> {
    try {
        const storage = await prisma.storage.findUniqueOrThrow({
            where: { id },
            include: { component: true },
        })
        return Result.ok(storage)
    } catch (e) {
        return handleError(e, "In getSingle storage")
    }
}

async function update(id: string, updateObj: StorageEdit): DbResult<StorageWithComponent> {
    try {
        const storage = await prisma.storage.update({
            where: { id },
            data: updateObj,
            include: {
                component: true,
            },
        })
        return Result.ok(storage)
    } catch (e) {
        return handleError(e, "In storage update")
    }
}

async function remove(id: string): DbResult<void> {
    try {
        await prisma.$transaction(async () => {
            const storage = await prisma.storage.findUniqueOrThrow({
                where: { id },
            })
            await prisma.storage.delete({
                where: { id },
            })
            await prisma.component.delete({
                where: { id: storage.componentId },
            })
        })
        return Result.ok(undefined)
    } catch (e) {
        return handleError(e, "In storage delete")
    }
}

const StorageRepo = {
    getMany,
    getSingle,
    create,
    update,
    remove,
}

export default StorageRepo
