import { prisma } from "../../../client"
import { DbResult } from "../../../../types"
import { Result } from "@badrap/result"
import handleError from "../../../utils"
import ComponentQuery from "../../universal_types/query.type"
import { PowerSupplyCreate, PowerSupplyEdit, PowerSupplyWithComponent } from "../validation/powerSupply.types"

async function create(createObj: PowerSupplyCreate): DbResult<PowerSupplyWithComponent> {
    try {
        const powerSupply = await prisma.$transaction(async () => {
            const component = await prisma.component.create({
                data: createObj.component,
            })
            const powerSupply = await prisma.powerSupply.create({
                data: {
                    id: createObj.id,
                    powerOutput: createObj.powerOutput,
                    efficiency: createObj.efficiency,
                    formFactor: createObj.formFactor,
                    componentId: component.id,
                },
                include: {
                    component: true,
                },
            })
            return powerSupply
        })
        return Result.ok(powerSupply)
    } catch (e) {
        return handleError(e, "In powerSupply craeate")
    }
}

async function getMany(query: ComponentQuery): DbResult<PowerSupplyWithComponent[]> {
    try {
        const powerSupplies = await prisma.powerSupply.findMany({
            where: {
                powerOutput: {
                    gte: query.powerIO,
                },
                formFactor: query.formFactor,
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
        return Result.ok(powerSupplies)
    } catch (e) {
        return handleError(e, "In powerSupply getmany")
    }
}

async function getSingle(id: string): DbResult<PowerSupplyWithComponent> {
    try {
        const powerSupply = await prisma.powerSupply.findUniqueOrThrow({
            where: { id },
            include: { component: true },
        })
        return Result.ok(powerSupply)
    } catch (e) {
        return handleError(e, "In powersupply find single")
    }
}

async function update(id: string, updateObj: PowerSupplyEdit): DbResult<PowerSupplyWithComponent> {
    try {
        const powerSupply = await prisma.powerSupply.update({
            where: { id },
            data: updateObj,
            include: { component: true },
        })
        return Result.ok(powerSupply)
    } catch (e) {
        return handleError(e, "in powerSupply update")
    }
}

async function remove(id: string): DbResult<void> {
    try {
        await prisma.$transaction(async () => {
            const powerSupply = await prisma.powerSupply.findUniqueOrThrow({
                where: { id },
            })
            await prisma.powerSupply.delete({
                where: { id },
            })
            await prisma.component.delete({
                where: {
                    id: powerSupply.componentId,
                },
            })
        })
        return Result.ok(undefined)
    } catch (e) {
        return handleError(e, "In delete powerSupply")
    }
}

const PowerSupplyRepo = {
    getMany,
    getSingle,
    create,
    update,
    remove,
}

export default PowerSupplyRepo
