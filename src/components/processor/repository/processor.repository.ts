import { DbResult } from "../../../../types"
import { Result } from "@badrap/result"
import { prisma } from "../../../client"
import { ProcessorWithComponent, ProcessorCreate, ProcessorEdit } from "../validation/processor.types"
import handleError from "../../../utils"
import ComponentQuery from "../../universal_types/query.type"

async function create(createObj: ProcessorCreate): DbResult<ProcessorWithComponent> {
    try {
        const processor = await prisma.$transaction(async () => {
            const component = await prisma.component.create({
                data: createObj.component,
            })
            const processor = await prisma.processor.create({
                data: {
                    id: createObj.id,
                    architecture: createObj.architecture,
                    cores: createObj.cores,
                    threads: createObj.threads,
                    bits: createObj.bits,
                    socket: createObj.socket,
                    componentId: component.id,
                },
                include: {
                    component: true,
                },
            })
            return processor
        })
        return Result.ok(processor)
    } catch (e) {
        return handleError(e, "In processor create")
    }
}

async function getMany(query: ComponentQuery): DbResult<ProcessorWithComponent[]> {
    try {
        const processors = await prisma.processor.findMany({
            where: {
                socket: query.socket,
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
        return Result.ok(processors)
    } catch (e) {
        return handleError(e, "In processor getmany")
    }
}

async function getSingle(id: string): DbResult<ProcessorWithComponent> {
    try {
        const processor = await prisma.processor.findUniqueOrThrow({
            where: { id },
            include: { component: true },
        })
        return Result.ok(processor)
    } catch (e) {
        return handleError(e, "In processor getSingle")
    }
}

async function update(id: string, updateObj: ProcessorEdit): DbResult<ProcessorWithComponent> {
    try {
        const processor = await prisma.processor.update({
            where: { id },
            data: updateObj,
            include: { component: true },
        })
        return Result.ok(processor)
    } catch (e) {
        return handleError(e, "in processor update")
    }
}

async function remove(id: string): DbResult<void> {
    try {
        await prisma.$transaction(async () => {
            const processor = await prisma.processor.findUniqueOrThrow({
                where: { id },
            })
            await prisma.processor.delete({
                where: { id },
            })
            await prisma.component.delete({
                where: { id: processor.componentId },
            })
        })
        return Result.ok(undefined)
    } catch (e) {
        return handleError(e, "in processor remove")
    }
}

const ProcessorRepo = {
    getMany,
    getSingle,
    create,
    update,
    remove,
}

export default ProcessorRepo
