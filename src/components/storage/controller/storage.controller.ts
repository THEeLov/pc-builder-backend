import baseComponentController from "../../base/controller/specific.components.controller"
import { Response, Request } from "express"
import StorageRepo from "../repository/storage.repository"
import { StorageWithComponent } from "../validation/storage.types"
import StorageSchema from "../validation/validation"

async function create(req: Request, res: Response): Promise<Response<StorageWithComponent>> {
    if (!req.body.capacity) {
        return res.status(400)
    }
    req.body.capacity = parseInt(req.body.capacity)
    return await baseComponentController.create(StorageSchema.StorageCreate, StorageRepo, req, res)
}

async function getMany(req: Request, res: Response): Promise<Response<StorageWithComponent[]>> {
    return await baseComponentController.getMany(StorageRepo, req, res)
}

async function getSingle(req: Request, res: Response): Promise<Response<StorageWithComponent>> {
    return await baseComponentController.getSingle(StorageRepo, req, res)
}

async function update(req: Request, res: Response): Promise<Response<StorageWithComponent>> {
    return await baseComponentController.update(StorageSchema.StorageEdit, StorageRepo, req, res)
}

async function remove(req: Request, res: Response): Promise<Response<void>> {
    return await baseComponentController.remove(StorageRepo, req, res)
}

const StorageController = {
    create,
    getMany,
    getSingle,
    update,
    remove,
}

export default StorageController
