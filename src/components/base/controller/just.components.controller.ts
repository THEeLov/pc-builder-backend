import { Request, Response } from "express"
import { baseValidation } from "../../../base/validation/validation"
import ComponentRepo from "../repository/components.repository"
import InternalError from "../../../errors/InternalError"
import BadRequest from "../../../errors/BadRequest"
import { authorizeAdmin } from "../../../utils"
import Unauthorized from "../../../errors/Unauthorized"
import { Component } from "@prisma/client"

export async function remove(req: Request, res: Response): Promise<Response<void>> {
    const id = baseValidation.IdRequestParams.safeParse(req.params)
    if (!id.success) {
        return res.status(400).json(BadRequest)
    }
    // if (!(await authorizeAdmin(req.cookies.sessionId))) {
    //     return res.status(401).json(Unauthorized)
    // }
    const result = await ComponentRepo.remove(id.data.id)
    if (!result.isOk) {
        console.log(result.error)
        return res.status(500).json(InternalError)
    }
    return res.status(200).json()
}

export async function getMany(req: Request, res: Response): Promise<Response<Component[]>> {
    const result = await ComponentRepo.getMany(req.query)
    if (!result.isOk) {
        return res.status(500).json(InternalError)
    }
    return res.status(200).json(
        result.value.map((component) => {
            return { component }
        }),
    )
}
