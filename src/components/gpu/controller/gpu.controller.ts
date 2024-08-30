import baseComponentController from "../../base/controller/specific.components.controller"
import { Response, Request } from "express"
import GPURepo from "../repository/gpu.repository"
import { GPUWithComponent } from "../validation/gpu.types"
import GPUSchema from "../validation/validation"

async function create(req: Request, res: Response): Promise<Response<GPUWithComponent>> {
    if (!req.body.memory || !req.body.power) {
        return res.status(400)
    }
    req.body.memory = parseInt(req.body.memory)
    req.body.power = parseInt(req.body.power)
    return await baseComponentController.create(GPUSchema.GPUCreate, GPURepo, req, res)
}

async function getMany(req: Request, res: Response): Promise<Response<GPUWithComponent[]>> {
    return await baseComponentController.getMany(GPURepo, req, res)
}

async function getSingle(req: Request, res: Response): Promise<Response<GPUWithComponent>> {
    return await baseComponentController.getSingle(GPURepo, req, res)
}

async function update(req: Request, res: Response): Promise<Response<GPUWithComponent>> {
    return await baseComponentController.update(GPUSchema.GPUEdit, GPURepo, req, res)
}

async function remove(req: Request, res: Response): Promise<Response<void>> {
    return await baseComponentController.remove(GPURepo, req, res)
}

const GPUController = {
    create,
    getMany,
    getSingle,
    update,
    remove,
}

export default GPUController
