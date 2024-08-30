import { prisma } from "../../../client"
import { DbResult } from "../../../../types"
import { MotherboardCreate, MotherboardEdit, MotherboardWithComponent } from "../validation/motherboard.types"
import { Result } from "@badrap/result"
import handleError from "../../../utils"
import ComponentQuery from "../../universal_types/query.type"

async function create(createObj: MotherboardCreate): DbResult<MotherboardWithComponent> {
    try {
        const motherboard = await prisma.$transaction(async () => {
            const component = await prisma.component.create({
                data: createObj.component,
            })
            const motherboard = await prisma.motherboard.create({
                data: {
                    id: createObj.id,
                    socket: createObj.socket,
                    formFactor: createObj.formFactor,
                    ramSlots: createObj.ramSlots,
                    ramType: createObj.ramType,
                    gpuInterface: createObj.gpuInterface,
                    stroageBusType: createObj.storageBusType,
                    componentId: component.id,
                },
                include: {
                    component: true,
                },
            })
            return motherboard
        })
        return Result.ok(motherboard)
    } catch (e) {
        return handleError(e, "In motherboard create")
    }
}

async function getMany(query: ComponentQuery): DbResult<MotherboardWithComponent[]> {
    try {
        const motherboards = await prisma.motherboard.findMany({
            where: {
                socket: query.socket,
                formFactor: query.formFactor,
                ramSlots: query.ramSlots,
                ramType: query.ramType,
                gpuInterface: query.gpuInterface,
                stroageBusType: query.storageBusType,
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
        return Result.ok(motherboards)
    } catch (e) {
        return handleError(e, "In motherboard getMany")
    }
}

async function getSingle(id: string): DbResult<MotherboardWithComponent> {
    try {
        const motherboard = await prisma.motherboard.findUniqueOrThrow({
            where: { id },
            include: { component: true },
        })
        return Result.ok(motherboard)
    } catch (e) {
        return handleError(e, "In motherboard getSingle")
    }
}

async function update(id: string, updateObj: MotherboardEdit): DbResult<MotherboardWithComponent> {
    try {
        const motherboard = await prisma.motherboard.update({
            where: { id },
            data: updateObj,
            include: {
                component: true,
            },
        })
        return Result.ok(motherboard)
    } catch (e) {
        return handleError(e, "in motherboard update")
    }
}

async function remove(id: string): DbResult<void> {
    try {
        await prisma.$transaction(async () => {
            const motherboard = await prisma.motherboard.findUniqueOrThrow({
                where: { id },
            })
            await prisma.motherboard.delete({
                where: { id },
            })
            await prisma.component.delete({
                where: {
                    id: motherboard.componentId,
                },
            })
        })
        return Result.ok(undefined)
    } catch (e) {
        return handleError(e, "in motherboard remove")
    }
}

const MotherboardRepo = {
    create,
    getMany,
    getSingle,
    update,
    remove,
}

export default MotherboardRepo
