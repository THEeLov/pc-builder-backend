import baseComponentController from "../../base/controller/specific.components.controller"
import { Response, Request } from "express"
import ProcessorRepo from "../repository/processor.repository"
import { ProcessorWithComponent } from "../validation/processor.types"
import ProcessorSchema from "../validation/validation"

async function create(req: Request, res: Response): Promise<Response<ProcessorWithComponent>> {
    if (!req.body.cores || !req.body.threads || !req.body.bits) {
        return res.status(400)
    }
    req.body.cores = parseInt(req.body.cores)
    req.body.threads = parseInt(req.body.threads)
    req.body.bits = parseInt(req.body.bits)
    return await baseComponentController.create(ProcessorSchema.ProcessorCreate, ProcessorRepo, req, res)
}

async function getMany(req: Request, res: Response): Promise<Response<ProcessorWithComponent[]>> {
    return await baseComponentController.getMany(ProcessorRepo, req, res)
}

async function getSingle(req: Request, res: Response): Promise<Response<ProcessorWithComponent>> {
    return await baseComponentController.getSingle(ProcessorRepo, req, res)
}

async function update(req: Request, res: Response): Promise<Response<ProcessorWithComponent>> {
    return await baseComponentController.update(ProcessorSchema.ProcessorEdit, ProcessorRepo, req, res)
}

async function remove(req: Request, res: Response): Promise<Response<void>> {
    return await baseComponentController.remove(ProcessorRepo, req, res)
}

const ProcessorController = {
    create,
    getMany,
    getSingle,
    update,
    remove,
}

export default ProcessorController
