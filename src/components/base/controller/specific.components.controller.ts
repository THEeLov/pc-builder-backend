import Unauthorized from "../../../errors/Unauthorized"
import { Request, Response } from "express"
import { baseValidation } from "../../../base/validation/validation"
import ComponentQuery from "../../universal_types/query.type"
import { DbResult } from "../../../../types"
import { SessionsRepository } from "../../../sessions/repository/sessions.repository"
import BadRequest from "../../../errors/BadRequest"
import { convertConfig, convertConfigurationToQueryType } from "../../universal_types/query.convert"
import { FullPartialConfig } from "../../../configurations/partial/parcialConfigTypes"
import InternalError from "../../../errors/InternalError"
import z from "zod"
import { PriceQuery } from "../validation/validation"
import { authorizeAdmin } from "../../../utils"

type Repository<T> = {
    getMany: (query: ComponentQuery) => DbResult<T[]>
    getSingle: (id: string) => DbResult<T>
    create: (createObj: any) => DbResult<T>
    remove: (id: string) => DbResult<void>
    update: (id: string, updateObj: any) => DbResult<T>
}

function getImageUrl(url: string | undefined) {
    if (!url) {
        return undefined
    }
    const parts = url.split("/images/")
    const result = parts.length > 1 ? parts[1] : url
    return result
}

function convertComponent(component?: any) {
    if (!component) {
        return undefined
    }
    component.price = parseFloat(component.price)
    return component
}

async function getMany<T>(repo: Repository<T>, req: Request, res: Response): Promise<Response<T[]>> {
    const validSessionCookie = baseValidation.cookieSchema.safeParse(req.cookies)
    if (!validSessionCookie.success) {
        return res.status(401).json(Unauthorized)
    }
    const priceQuery = PriceQuery.safeParse(req.query)
    if (!priceQuery.success) {
        return res.status(400).json(BadRequest)
    }
    const sessionResult = await SessionsRepository.getFull(validSessionCookie.data.sessionId)
    let query
    if (sessionResult.isOk && sessionResult.value.user.partialUserConfiguration) {
        const configuration: FullPartialConfig = convertConfig(sessionResult.value.user.partialUserConfiguration)
        query = convertConfigurationToQueryType(configuration)
    } else {
        query = {}
    }
    query.maxPrice = priceQuery.data.maxPrice ? parseInt(priceQuery.data.maxPrice) : undefined
    query.minPrice = priceQuery.data.minPrice ? parseInt(priceQuery.data.minPrice) : undefined
    const result = await repo.getMany(query)
    if (!result.isOk) {
        return res.status(500).json(InternalError)
    }
    return res.status(200).json(result.value)
}

async function getSingle<T>(repo: Repository<T>, req: Request, res: Response): Promise<Response<T>> {
    const validatedParams = baseValidation.IdRequestParams.safeParse(req.params)
    if (!validatedParams.success) {
        return res.status(400).json(BadRequest)
    }
    const object = await repo.getSingle(validatedParams.data.id)
    if (!object.isOk) {
        return res.status(500).json(InternalError)
    }
    return res.status(200).json(object.value)
}

async function create<T>(
    Create: z.ZodObject<any>,
    repo: Repository<T>,
    req: Request,
    res: Response,
): Promise<Response<T>> {
    req.body.component = convertComponent(req.body.component)
    if (!req.body.component) {
        return res.status(400).json(BadRequest)
    }

    req.body.component.imageUrl = "http://localhost:3000/images/" + getImageUrl(req.file?.path)
    const validatedBody = Create.safeParse(req.body)
    if (!validatedBody.success) {
        return res.status(400).json(BadRequest)
    }
    // if (!(await authorizeAdmin(req.cookies.sessionId))) {
    //     return res.status(401).json(Unauthorized)
    // }
    const component = await repo.create(validatedBody.data)
    if (!component.isOk) {
        return res.status(500).json(InternalError)
    }
    return res.status(200).json(component.value)
}

async function remove<T>(repo: Repository<T>, req: Request, res: Response): Promise<Response<void>> {
    const validatedParams = baseValidation.IdRequestParams.safeParse(req.params)
    if (!validatedParams.success) {
        return res.status(400).json(BadRequest)
    }
    if (!(await authorizeAdmin(req.cookies.sessionId))) {
        return res.status(401).json(Unauthorized)
    }
    const deletion = await repo.remove(validatedParams.data.id)
    if (!deletion.isOk) {
        return res.status(500).json(InternalError)
    }
    return res.status(200).json()
}

async function update<T>(
    Update: z.ZodObject<any>,
    repo: Repository<T>,
    req: Request,
    res: Response,
): Promise<Response<T>> {
    const validatedParams = baseValidation.IdRequestParams.safeParse(req.params)
    const validatedBody = Update.safeParse(req.body)
    if (!validatedBody.success || !validatedParams.success) {
        return res.status(400).json(BadRequest)
    }
    if (!(await authorizeAdmin(req.cookies.sessionId))) {
        return res.status(401).json(Unauthorized)
    }
    const updatedComponent = await repo.update(validatedParams.data.id, validatedBody.data)
    if (!updatedComponent.isOk) {
        return res.status(500).json(InternalError)
    }
    return res.status(200).json(updatedComponent.value)
}

const baseComponentController = {
    getMany,
    getSingle,
    create,
    remove,
    update,
}

export default baseComponentController
