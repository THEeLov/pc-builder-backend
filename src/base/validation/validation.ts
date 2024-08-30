import z from "zod"
const IdRequestParams = z.object({
    id: z.string().uuid(),
})

const cookieSchema = z.object({
    sessionId: z.string().uuid(),
})

export const baseValidation = {
    IdRequestParams,
    cookieSchema,
}
