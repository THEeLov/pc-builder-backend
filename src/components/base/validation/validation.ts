import z from "zod"
import { ComponentType } from "@prisma/client"

const componentType = z.enum(Object.values(ComponentType) as [ComponentType, ...ComponentType[]])

const priceSchema = z.string().refine(
    (val) => {
        const num = Number(val)
        return !isNaN(num)
    },
    {
        message: "Must be a valid number",
    },
)

export const PriceQuery = z.object({
    minPrice: priceSchema.optional(),
    maxPrice: priceSchema.optional(),
})

export const component = z.object({
    id: z.string().uuid(),
    name: z.string(),
    componentType: componentType,
    price: z.number(),
    manufacturer: z.string(),
    imageUrl: z.string(),
})

export const componentCreate = z.object({
    name: z.string(),
    componentType: componentType,
    price: z.number(),
    manufacturer: z.string(),
    imageUrl: z.string(),
})
