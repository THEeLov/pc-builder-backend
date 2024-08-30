import baseComponentController from "../../base/controller/specific.components.controller"
import { Response, Request } from "express"
import PCCaseRepo from "../repository/pcCase.repository"
import { PCCaseWithComponent } from "../validation/pcCase.types"
import PCCaseSchema from "../validation/validation"

async function create(req: Request, res: Response): Promise<Response<PCCaseWithComponent>> {
    return await baseComponentController.create(PCCaseSchema.PCCaseCreate, PCCaseRepo, req, res)
}

async function getMany(req: Request, res: Response): Promise<Response<PCCaseWithComponent[]>> {
    return await baseComponentController.getMany(PCCaseRepo, req, res)
}

async function getSingle(req: Request, res: Response): Promise<Response<PCCaseWithComponent>> {
    return await baseComponentController.getSingle(PCCaseRepo, req, res)
}

async function update(req: Request, res: Response): Promise<Response<PCCaseWithComponent>> {
    return await baseComponentController.update(PCCaseSchema.PCCaseEdit, PCCaseRepo, req, res)
}

async function remove(req: Request, res: Response): Promise<Response<void>> {
    return await baseComponentController.remove(PCCaseRepo, req, res)
}

const PCCaseController = {
    create,
    getMany,
    getSingle,
    update,
    remove,
}

export default PCCaseController
