import { Prisma } from "@prisma/client"
import MotherboardSchemas from "./validation"
import z from "zod"

export type MotherboardWithComponent = Prisma.MotherboardGetPayload<{ include: { component: true } }>
export type MotherboardCreate = z.infer<typeof MotherboardSchemas.MotherboardCreate>
export type MotherboardEdit = z.infer<typeof MotherboardSchemas.MotherboardEdit>
