import ComponentQuery from "../../universal_types/query.type"
import { prisma } from "../../../client"
import { DbResult } from "../../../../types"
import handleError from "../../../utils"
import { Result } from "@badrap/result"
import { RamCreate, RamEdit, RamWithComponent } from "../validation/ram.types"

async function getMany(query: ComponentQuery): DbResult<RamWithComponent[]> {
    try {
        const rams = await prisma.rAM.findMany({
            where: {
                memoryType: query.ramType,
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
        return Result.ok(rams)
    } catch (e) {
        return handleError(e, "In getMany RAMS")
    }
}

async function create(createObj: RamCreate): DbResult<RamWithComponent> {
    try {
        const ram = await prisma.$transaction(async () => {
            const component = await prisma.component.create({
                data: createObj.component,
            })
            const ram = await prisma.rAM.create({
                data: {
                    id: createObj.id,
                    memoryType: createObj.memoryType,
                    capacity: createObj.capacity,
                    computerType: createObj.computerType,
                    componentId: component.id,
                },
                include: {
                    component: true,
                },
            })
            return ram
        })
        return Result.ok(ram)
    } catch (e) {
        console.log(e)
        return handleError(e, "Ram create")
    }
}

async function getSingle(id: string): DbResult<RamWithComponent> {
    try {
        const ram = await prisma.rAM.findUniqueOrThrow({
            where: {
                id,
            },
            include: {
                component: true,
            },
        })
        return Result.ok(ram)
    } catch (e) {
        return handleError(e, "in RAM getSingle")
    }
}

async function update(id: string, updateObj: RamEdit): DbResult<RamWithComponent> {
    try {
        const ram = await prisma.rAM.update({
            where: {
                id,
            },
            data: updateObj,
            include: {
                component: true,
            },
        })
        return Result.ok(ram)
    } catch (e) {
        return handleError(e, "In update RAM")
    }
}

async function remove(id: string): DbResult<void> {
    try {
        await prisma.$transaction(async () => {
            const ram = await prisma.rAM.findUniqueOrThrow({
                where: { id },
            })
            await prisma.rAM.delete({
                where: {
                    id,
                },
            })
            await prisma.component.delete({
                where: {
                    id: ram.componentId,
                },
            })
        })
        return Result.ok(undefined)
    } catch (e) {
        return handleError(e, "In RAM remove")
    }
}

const RAMRepo = {
    getMany,
    getSingle,
    create,
    update,
    remove,
}

export default RAMRepo
