import { UserType } from "@prisma/client"

export type UserCreate = {
    username: string
    email: string
    password: string
    userRole?: UserType
}

export type UserEdit = {
    username?: string
    email?: string
    password?: string
}

// DTOS

export type UserDTO = {
    id: string
    username: string
    email: string
    role: UserType
}
