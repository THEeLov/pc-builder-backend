import { ConfigurationType } from "@prisma/client"
import z from "zod"

export const configType = z.enum(Object.values(ConfigurationType) as [ConfigurationType, ...ConfigurationType[]])
