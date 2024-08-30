import { prisma } from "../../client"
import { User } from "@prisma/client"
import { DbResult } from "../../../types"
import { UserCreate, UserEdit } from "../userTypes"
import handleError from "../../utils"
import bcrypt from "bcryptjs"
import { UserWithEverything } from "../validation/validation"
import { Result } from "@badrap/result"

const saltRounds = 10

async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds)
}

async function create(data: UserCreate): DbResult<User> {
    try {
        const hashed = await hashPassword(data.password)
        const newUser = await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashed,
                userType: data.userRole,
            },
        })
        return Result.ok(newUser)
    } catch (error) {
        console.log(error)
        return handleError(error, "in user create")
    }
}

async function update(id: string, data: UserEdit): DbResult<UserWithEverything> {
    try {
        const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: data,
            include: {
                userconfigurations: true,
                partialUserConfiguration: true,
            },
        })
        return Result.ok(user)
    } catch (error) {
        return handleError(error, "in update user")
    }
}

async function remove(id: string): DbResult<void> {
    try {
        await prisma.user.delete({
            where: {
                id: id,
            },
        })
        return Result.ok(undefined)
    } catch (error) {
        return handleError(error, "in user remove")
    }
}

async function getByEmail(email: string): DbResult<UserWithEverything> {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: email,
            },
            include: {
                userconfigurations: true,
                partialUserConfiguration: true,
            },
        })
        return Result.ok(user)
    } catch (error) {
        return handleError(error, "in user getByEmail")
    }
}

async function get(identifier: string): DbResult<UserWithEverything> {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: identifier,
            },
            include: {
                userconfigurations: true,
                partialUserConfiguration: true,
            },
        })
        return Result.ok(user)
    } catch (error) {
        return handleError(error, "in user get")
    }
}

export const UsersRepository = {
    create,
    update,
    remove,
    get,
    getByEmail,
}
