import { prisma } from "../../../client"
import { Result } from "@badrap/result"
import { DbResult } from "../../../../types"
import handleError from "../../../utils"
import ComponentQuery from "../../universal_types/query.type"
import { PCCaseWithComponent, PCCaseCreate, PCCaseEdit } from "../validation/pcCase.types"

async function create(createObj: PCCaseCreate): DbResult<PCCaseWithComponent> {
    try {
        const pcCase = await prisma.$transaction(async () => {
            const component = await prisma.component.create({
                data: createObj.component,
            })
            const pcCase = await prisma.pCCase.create({
                data: {
                    id: createObj.id,
                    formFactor: createObj.formFactor,
                    componentId: component.id,
                },
                include: {
                    component: true,
                },
            })
            return pcCase
        })
        return Result.ok(pcCase)
    } catch (e) {
        return handleError(e, "In create PCCase")
    }
}

async function getMany(query: ComponentQuery): DbResult<PCCaseWithComponent[]> {
    try {
        const pcCases = await prisma.pCCase.findMany({
            where: {
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
        return Result.ok(pcCases)
    } catch (e) {
        return handleError(e, "in getMany pcCases")
    }
}

async function getSingle(id: string): DbResult<PCCaseWithComponent> {
    try {
        const pcCase = await prisma.pCCase.findUniqueOrThrow({
            where: { id },
            include: { component: true },
        })
        return Result.ok(pcCase)
    } catch (e) {
        return handleError(e, "in getsingle pcccase")
    }
}

async function update(id: string, updateObj: PCCaseEdit): DbResult<PCCaseWithComponent> {
    try {
        const pcCase = await prisma.pCCase.update({
            where: { id },
            data: updateObj,
            include: {
                component: true,
            },
        })
        return Result.ok(pcCase)
    } catch (e) {
        return handleError(e, "In pcCase update")
    }
}

async function remove(id: string): DbResult<void> {
    try {
        await prisma.$transaction(async () => {
            const pcCase = await prisma.pCCase.findUniqueOrThrow({
                where: { id },
            })
            await prisma.pCCase.delete({
                where: { id },
            })
            await prisma.component.delete({
                where: { id: pcCase.componentId },
            })
        })
        return Result.ok(undefined)
    } catch (e) {
        return handleError(e, "In remove PCCase")
    }
}

const PCCaseRepo = {
    create,
    getMany,
    getSingle,
    update,
    remove,
}

export default PCCaseRepo
