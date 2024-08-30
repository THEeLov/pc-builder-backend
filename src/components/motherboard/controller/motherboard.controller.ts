import baseComponentController from "../../base/controller/specific.components.controller"
import { Response, Request } from "express"
import MotherboardRepo from "../repository/motherboard.repository"
import { MotherboardWithComponent } from "../validation/motherboard.types"
import MotherboardSchemas from "../validation/validation"

async function create(req: Request, res: Response): Promise<Response<MotherboardWithComponent>> {
    if (!req.body.ramSlots) {
        return res.status(400)
    }
    req.body.ramSlots = parseInt(req.body.ramSlots)
    return await baseComponentController.create(MotherboardSchemas.MotherboardCreate, MotherboardRepo, req, res)
}

async function getMany(req: Request, res: Response): Promise<Response<MotherboardWithComponent[]>> {
    return await baseComponentController.getMany(MotherboardRepo, req, res)
}

async function getSingle(req: Request, res: Response): Promise<Response<MotherboardWithComponent>> {
    return await baseComponentController.getSingle(MotherboardRepo, req, res)
}

async function update(req: Request, res: Response): Promise<Response<MotherboardWithComponent>> {
    return await baseComponentController.update(MotherboardSchemas.MotherboardEdit, MotherboardRepo, req, res)
}

async function remove(req: Request, res: Response): Promise<Response<void>> {
    return await baseComponentController.remove(MotherboardRepo, req, res)
}

const MotherboardController = {
    create,
    getMany,
    getSingle,
    update,
    remove,
}

export default MotherboardController
