import { Context, NextFunction } from "grammy"
import { logger } from "../telegramMiddlewares/logger"
import { telegramBot } from "../utils/telegram"
import { telegramFileHandler } from "./telegramFileHandler"
import { telegramMessageHandler } from "./telegramMessageHandler"
import { telegramCommandHandler } from "./telegramCommandHandler"
import { limit } from "@grammyjs/ratelimiter"
import { telegramQueueEndHandler, telegramQueueStartHandler } from "./telegramQueueHandler"

telegramBot.use(limit({
    limit: 100,
    timeFrame: 1000 * 60 * 60 * 24,
    onLimitExceeded: async (ctx: Context, next: NextFunction) => {
        ctx.reply("Fingu gotta go, see you tomorrow !")
    }
}))


telegramBot.use(logger)

telegramBot.on("msg::bot_command", telegramCommandHandler)

telegramBot.use(telegramQueueStartHandler)

telegramBot.on("message:file", telegramFileHandler)

telegramBot.on("message:text", telegramMessageHandler)

telegramBot.use(telegramQueueEndHandler)

telegramBot.use((ctx: Context, next: NextFunction) => {

    if (!ctx.message?.message_id) return

    ctx.reply("What's that ?", { reply_to_message_id: ctx.message.message_id })
})

export { telegramBot }