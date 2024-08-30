import PowerSupplyRepo from "../repository/powerSupply.repository"
import PowerSupplySchema from "../validation/validation"
import { PowerSupplyWithComponent } from "../validation/powerSupply.types"
import { Request, Response } from "express"
import baseComponentController from "../../base/controller/specific.components.controller"

async function getMany(req: Request, res: Response): Promise<Response<PowerSupplyWithComponent[]>> {
    return await baseComponentController.getMany(PowerSupplyRepo, req, res)
}

async function create(req: Request, res: Response): Promise<Response<PowerSupplyWithComponent>> {
    if (!req.body.powerOutput) {
        return res.status(400)
    }
    req.body.powerOutput = parseInt(req.body.powerOutput)
    return await baseComponentController.create(PowerSupplySchema.PowerSupplyCreate, PowerSupplyRepo, req, res)
}

async function remove(req: Request, res: Response): Promise<Response<void>> {
    return await baseComponentController.remove(PowerSupplyRepo, req, res)
}

async function update(req: Request, res: Response): Promise<Response<PowerSupplyWithComponent>> {
    return await baseComponentController.update(PowerSupplySchema.PowerSupplyEdit, PowerSupplyRepo, req, res)
}

async function getSingle(req: Request, res: Response): Promise<Response<PowerSupplyWithComponent>> {
    return await baseComponentController.getSingle(PowerSupplyRepo, req, res)
}

const PowerSupplyController = {
    getMany,
    getSingle,
    create,
    remove,
    update,
}

export default PowerSupplyController
