import { DbResult } from "../../../types"
import { prisma } from "../../client"
import { Prisma, Session } from "@prisma/client"
import { Result } from "@badrap/result"
import handleError from "../../utils"
import includeQuery from "../../configurations/configurationQuery"

const ONE_DAY_MILLIS = 1000 * 60 * 60 * 24

type SessionWithFullUser = Prisma.SessionGetPayload<{
    include: {
        user: {
            include: {
                partialUserConfiguration: {
                    include: typeof includeQuery
                }
            }
        }
    }
}>

async function create(userId: string): DbResult<Session> {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
        })
        const tomorrow = new Date(new Date().getTime() + ONE_DAY_MILLIS)
        const newSession = await prisma.session.create({
            data: {
                expiresAt: tomorrow,
                userId,
                userType: user.userType,
            },
        })
        return Result.ok(newSession)
    } catch (e) {
        return handleError(e, "in session create")
    }
}

async function get(sessionId: string): DbResult<Session> {
    try {
        const session = await prisma.session.findUniqueOrThrow({
            where: {
                id: sessionId,
            },
        })
        return Result.ok(session)
    } catch (e) {
        return handleError(e, "In session get")
    }
}

async function getFull(sessionId: string): DbResult<SessionWithFullUser> {
    try {
        const session = await prisma.session.findUniqueOrThrow({
            where: {
                id: sessionId,
            },
            include: {
                user: {
                    include: {
                        partialUserConfiguration: {
                            include: includeQuery,
                        },
                    },
                },
            },
        })
        return Result.ok(session)
    } catch (e) {
        return handleError(e, "in session get")
    }
}

async function remove(id: string): DbResult<void> {
    try {
        await prisma.session.delete({
            where: {
                id,
            },
        })
        return Result.ok(undefined)
    } catch (e) {
        return handleError(e, "session delete")
    }
}

export const SessionsRepository = {
    create,
    get,
    getFull,
    remove,
}
