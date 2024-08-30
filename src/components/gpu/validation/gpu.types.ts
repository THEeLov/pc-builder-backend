import z from "zod"
import GPUSchema from "./validation"
import { Prisma } from "@prisma/client"

export type GPUWithComponent = Prisma.GPUGetPayload<{ include: { component: true } }>
export type GPUCreate = z.infer<typeof GPUSchema.GPUCreate>
export type GPUEdit = z.infer<typeof GPUSchema.GPUEdit>
