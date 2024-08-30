import z from "zod"
import { Prisma } from "@prisma/client"
import StorageSchema from "./validation"

export type StorageWithComponent = Prisma.StorageGetPayload<{ include: { component: true } }>
export type StorageCreate = z.infer<typeof StorageSchema.StorageCreate>
export type StorageEdit = z.infer<typeof StorageSchema.StorageEdit>
