import { prisma } from "../../../client"
import { DbResult } from "../../../../types"
import handleError from "../../../utils"
import { ComponentType, Component } from "@prisma/client"
import { Result } from "@badrap/result"
import MotherboardRepo from "../../motherboard/repository/motherboard.repository"
import ProcessorRepo from "../../processor/repository/processor.repository"
import GPURepo from "../../gpu/repository/gpu.repository"
import StorageRepo from "../../storage/repository/storage.repository"
import RAMRepo from "../../rams/repository/rams.repository"
import PCCaseRepo from "../../pcCase/repository/pcCase.repository"
import PowerSupplyRepo from "../../powerSupply/repository/powerSupply.repository"

type PriceQuery = {
    maxPrice?: string
    minPrice?: string
}

async function getMany(query: PriceQuery, type?: ComponentType): DbResult<Component[]> {
    try {
        const components = await prisma.component.findMany({
            where: {
                componentType: type,
                price: {
                    gte: query.minPrice ? parseInt(query.minPrice) : undefined,
                    lte: query.maxPrice ? parseInt(query.maxPrice) : undefined,
                },
            },
        })
        return Result.ok(components)
    } catch (e) {
        return handleError(e, "getMany components")
    }
}

async function remove(id: string) {
    try {
        const component = await prisma.component.findUniqueOrThrow({
            where: { id },
            include: {
                motherboard: true,
                processor: true,
                gpu: true,
                ram: true,
                storage: true,
                powerSupply: true,
                pcCase: true,
            },
        })
        if (component.motherboard) {
            await MotherboardRepo.remove(component.motherboard.id)
        } else if (component.processor) {
            await ProcessorRepo.remove(component.processor.id)
        } else if (component.gpu) {
            await GPURepo.remove(component.gpu.id)
        } else if (component.ram) {
            await RAMRepo.remove(component.ram.id)
        } else if (component.storage) {
            await StorageRepo.remove(component.storage.id)
        } else if (component.powerSupply) {
            await PowerSupplyRepo.remove(component.powerSupply.id)
        } else if (component.pcCase) {
            await PCCaseRepo.remove(component.pcCase.id)
        }
        return Result.ok(undefined)
    } catch (e) {
        return handleError(e, "in component delete")
    }
}

const ComponentRepo = {
    getMany,
    remove,
}

export default ComponentRepo
