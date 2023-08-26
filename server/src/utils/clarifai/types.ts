import z from "zod"

export const messageSchema = z.object({
    text: z.string(),
    isUser: z.boolean()
})
export type Message = z.infer<typeof messageSchema>

export const messagesSchema = z.array(
    messageSchema
)
export type Messages = z.infer<typeof messagesSchema>

export const askClarifyParamsSchema = z.object({
    messages: z.string(),
    name: z.string(),
    sysPrompt: z.string().optional()
})
export type AskClarifyParams = z.infer<typeof askClarifyParamsSchema>

export const generatePromptParamsSchema = z.object({
    messages: messagesSchema
})
export type GeneratePromptParams = z.infer<typeof generatePromptParamsSchema>

export const pruneHistoryParamsSchema = z.object({
    messages: messagesSchema,
    maxCharCount: z.number().optional()
})
export type PruneHistoryParams = z.infer<typeof pruneHistoryParamsSchema>