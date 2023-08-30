import { Context, NextFunction } from "grammy"
import { logger } from "../telegramMiddlewares/logger"
import { telegramBot } from "../utils/telegram"
import { telegramFileHandler } from "./telegramFileHandler"
import { telegramMessageHandler } from "./telegramMessageHandler"
import { telegramCommandHandler } from "./telegramCommandHandler"
import { chatAction } from "../telegramMiddlewares/chatAction"
import { limit } from "@grammyjs/ratelimiter"
import { prisma } from "../utils/prisma"
import { messageSchema } from "../utils/clarifai/types"

telegramBot.use(limit({
    limit: 1,
    timeFrame: 30000,
    onLimitExceeded: async(ctx: Context, next: NextFunction) => {
        if (!ctx.message) return
        // add user message into db

        const userId = await prisma.user.findFirst({
            where:{
                telegramId: ctx.message.from.id.toString()
            },
            select:{
                id: true
            }
        })

        if (!userId) return

        const newMessage = {
            isUser: true,
            text: ctx.message.text ?? "..."
        }

        const res = await prisma.chat.create({
            data:{
                userId:userId?.id,
                content: newMessage
            }
        })
    }
}))

telegramBot.use(logger)

telegramBot.use(chatAction)

telegramBot.on("msg::bot_command", telegramCommandHandler)

telegramBot.on("message:file", telegramFileHandler)

telegramBot.on("message", telegramMessageHandler)

telegramBot.use((ctx: Context, next: NextFunction) => {

    if (!ctx.message?.message_id) return

    ctx.reply("What's that ?", { reply_to_message_id: ctx.message.message_id })
})

export const initRoutes = () => { }