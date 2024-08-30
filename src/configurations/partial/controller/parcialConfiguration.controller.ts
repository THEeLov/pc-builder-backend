import { Request, Response } from "express"
import { parcialConfigSchema } from "../validation/validation"
import { baseValidation } from "../../../base/validation/validation"
import { authorize } from "../../../utils"
import { ParcialConfigurationRepository } from "../repository/parcialConfiguration.repository"
import { ParcialConfigWithComponent } from "../parcialConfigTypes"
import { ConfigEdit, ParcialConfigEdit } from "../../configurationQuery"
import { ConfigurationType } from "@prisma/client"
import { GamingConfig, OfficeConfig, HighEndConfig, WorkConfig } from "../seeded_data/defatult-configs"

function getConfigAttributes(config: ConfigurationType) {
    switch (config) {
        case ConfigurationType.GAMING:
            return GamingConfig
        case ConfigurationType.OFFICE:
            return OfficeConfig
        case ConfigurationType.HIGH_END:
            return HighEndConfig
        case ConfigurationType.WORK:
            return WorkConfig
        default:
            return {}
    }
}

async function get(req: Request, res: Response): Promise<Response<ParcialConfigWithComponent>> {
    const validatedParams = baseValidation.IdRequestParams.safeParse(req.params)
    if (!validatedParams.success || !(await authorize(validatedParams.data.id, req.cookies.sessionId))) {
        return res.status(400).json(new Error("Bad request"))
    }
    const configuration = await ParcialConfigurationRepository.get(validatedParams.data.id)
    if (configuration.isErr) {
        return res.status(401).json(configuration.error)
    }
    if (configuration.isOk) {
        return res.status(200).json(configuration.value)
    }
    return res.status(500).json(new Error("error on our side"))
}

async function update(req: Request, res: Response): Promise<Response<ParcialConfigWithComponent>> {
    const validatedParams = baseValidation.IdRequestParams.safeParse(req.params)
    if (!validatedParams.success || !(await authorize(validatedParams.data.id, req.cookies.sessionId))) {
        return res.status(401).json(new Error("Unauthorized"))
    }
    const validatedBody = parcialConfigSchema.updateObject.safeParse(req.body)
    if (!validatedBody.success) {
        console.log(req.body)
        return res.status(400).json(new Error("Bad request"))
    }
    if (validatedBody.data.delete) {
        return removeComponentFromConfig(res, validatedParams.data.id, validatedBody.data)
    }
    const updatedConfig = await ParcialConfigurationRepository.update(validatedParams.data.id, validatedBody.data)
    if (!updatedConfig.isOk) {
        return res.status(500).json(updatedConfig.isErr ? updatedConfig.error : new Error("Internal error"))
    }
    return res.status(200).json(updatedConfig.value)
}

async function removeComponentFromConfig(res: Response, userId: string, body: ParcialConfigEdit) {
    body.motherboardId = body.motherboardId ? null : undefined
    body.processorId = body.processorId ? null : undefined
    body.gpuId = body.gpuId ? null : undefined
    body.PCCaseId = body.PCCaseId ? null : undefined
    body.powerSupplyId = body.powerSupplyId ? null : undefined
    const updatedConfig = await ParcialConfigurationRepository.removeComponent(userId, body)
    if (!updatedConfig.isOk) {
        return res.status(500).json(updatedConfig.isErr ? updatedConfig.error : new Error("Internal error"))
    }
    return res.status(200).json(updatedConfig.value)
}

async function create(req: Request, res: Response): Promise<Response<ParcialConfigWithComponent>> {
    const validatedParams = baseValidation.IdRequestParams.safeParse(req.params)
    const validatedBody = parcialConfigSchema.createObject.safeParse(req.body)
    if (
        !validatedParams.success ||
        !validatedBody.success ||
        !(await authorize(validatedParams.data.id, req.cookies.sessionId))
    ) {
        return res.status(400).json(new Error("Bad request"))
    }
    const configAttributes: ConfigEdit = getConfigAttributes(validatedBody.data.configurationType)
    const createdPartialConfig = await ParcialConfigurationRepository.create(validatedParams.data.id, {
        ...validatedBody.data,
        ...configAttributes,
    })
    if (!createdPartialConfig.isOk) {
        return res
            .status(500)
            .json(createdPartialConfig.isErr ? createdPartialConfig.error : new Error("Internal error"))
    }
    return res.status(200).json(createdPartialConfig.value)
}

async function remove(req: Request, res: Response): Promise<Response<void>> {
    const validatedParams = baseValidation.IdRequestParams.safeParse(req.params)
    if (!validatedParams.success || !(await authorize(validatedParams.data.id, req.cookies.sessionId))) {
        return res.status(400).json(new Error("Bad Request"))
    }
    const result = await ParcialConfigurationRepository.remove(validatedParams.data.id)
    if (result.isErr) {
        return res.status(500).json(result.error)
    }
    return res.status(200).json(undefined)
}

export const ParcialConfigurationController = {
    get,
    update,
    create,
    remove,
    removeComponentFromConfig,
}
