import { UsersRepository } from "../repository/users.repository"
import { SessionsRepository } from "../../sessions/repository/sessions.repository"
import { Request, Response } from "express"
import { UserSchema } from "../validation/validation"
import { authorize } from "../../utils"
import bcrypt from "bcryptjs"
import { UserDTO } from "../userTypes"

async function register(req: Request, res: Response): Promise<Response<UserDTO>> {
    const register = UserSchema.Register.safeParse(req.body)
    if (!register.success) {
        return res.status(400).json(new Error(register.error.message))
    }
    const result = await UsersRepository.create({
        username: register.data.username,
        email: register.data.email,
        password: register.data.password,
    })
    if (result.isErr) {
        return res.status(400).json(result.error)
    }
    if (result.isOk) {
        const session = await SessionsRepository.create(result.value.id)
        if (!session.isOk) {
            return res.status(400).json(session.isErr ? session.error : new Error("internal error"))
        }
        res.cookie('sessionId', session.value.id, { httpOnly: true, maxAge: session.value.expiresAt.getTime() - new Date().getTime(), path: '/', sameSite: 'none', secure: true });
        return res.status(200).json({
            id: result.value.id,
            username: result.value.username,
            email: result.value.email,
            role: result.value.userType,
        })
    }
    return res.status(500).json(new Error("Internal error"))
}

async function login(req: Request, res: Response): Promise<Response<UserDTO | Error>> {
    const login = UserSchema.Login.safeParse(req.body)
    if (!login.success) {
        return res.status(400).json(new Error(login.error.message))
    }
    const user = await UsersRepository.getByEmail(login.data.email)
    if (user.isErr) {
        return res.status(400).json(user.error)
    }
    if (user.isOk) {
        const result = await bcrypt.compare(login.data.password, user.value.password)
        if (result) {
            const session = await SessionsRepository.create(user.value.id)
            if (!session.isOk) {
                return res.status(400).json(session.isErr ? session.error : new Error("internal error"))
            }

            res.cookie('sessionId', session.value.id, { httpOnly: true, maxAge: session.value.expiresAt.getTime() - new Date().getTime(), path: '/', sameSite: 'none', secure: true });
            return res.status(200).json({
                id: user.value.id,
                username: user.value.username,
                email: user.value.email,
                role: user.value.userType,
            })
        } else {
            return res.status(400).json(new Error("Invalid credentials"))
        }
    }
    return res.status(500).json(new Error("Internal error"))
}

async function getSingle(req: Request, res: Response): Promise<Response<UserDTO | Error>> {
    const userId = UserSchema.getParams.safeParse(req.params)
    if (!userId.success) {
        return res.status(400).json(new Error(userId.error.message))
    }
    if (!(await authorize(userId.data.id, req.cookies.sessionId))) {
        return res.status(401).json(new Error("Unauthorized"))
    }
    const user = await UsersRepository.get(userId.data.id)
    if (user.isErr) {
        return res.status(400).json(user.error)
    }
    if (user.isOk) {
        return res.status(200).json({
            id: user.value.id,
            username: user.value.username,
            email: user.value.email,
            role: user.value.userType,
        })
    }
    return res.status(500).json(new Error("Internal error"))
}

async function deleteSingle(req: Request, res: Response): Promise<Response<string | Error>> {
    const userId = UserSchema.getParams.safeParse(req.params)
    if (!userId.success) {
        return res.status(400).json(new Error(userId.error.message))
    }
    if (!(await authorize(userId.data.id, req.cookies.sessionId))) {
        return res.status(401).json(new Error("Unauthorized"))
    }
    const user = await UsersRepository.remove(userId.data.id)
    if (user.isErr) {
        return res.status(400).json(user.error)
    }
    if (user.isOk) {
        return res.status(200).json("Success!")
    }
    return res.status(500).json(new Error("Internal error"))
}

async function updateSingle(req: Request, res: Response): Promise<Response<UserDTO | Error>> {
    const updateParams = UserSchema.Edit.safeParse(req.body)
    if (!updateParams.success) {
        return res.status(400).json(new Error(updateParams.error.message))
    }
    const userId = UserSchema.getParams.safeParse(req.params)
    if (!userId.success) {
        return res.status(400).json(new Error(userId.error.message))
    }
    if (!(await authorize(userId.data.id, req.cookies.sessionId))) {
        return res.status(401).json(new Error("Unauthorized"))
    }
    const user = await UsersRepository.update(userId.data.id, updateParams.data)
    if (user.isErr) {
        return res.status(400).json(user.error)
    }
    if (user.isOk) {
        return res.status(200).json(user.value)
    }
    return res.status(500).json(new Error("Internal error"))
}

async function logout(req: Request, res: Response): Promise<Response<void>> {
    const params = UserSchema.getParams.safeParse(req.body)
    if (!params.success || !(await authorize(params.data.id, req.cookies.sessionId))) {
        return res.status(401).json()
    }
    res.clearCookie("sessionId")
    SessionsRepository.remove(req.cookies.sessionId)
    return res.status(200).json()
}

export const UsersController = {
    register,
    login,
    logout,
    getSingle,
    deleteSingle,
    updateSingle,
}
