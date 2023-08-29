import { Context, NextFunction } from "grammy"
import { logger } from "../telegramMiddlewares/logger"
import { telegramBot } from "../utils/telegram"
import { telegramFileHandler } from "./telegramFileHandler"
import { telegramMessageHandler } from "./telegramMessageHandler"
import { telegramCommandHandler } from "./telegramCommandHandler"
import { chatAction } from "../telegramMiddlewares/chatAction"
import { limit } from "@grammyjs/ratelimiter"

telegramBot.use(limit({
    limit: 1,
    timeFrame:10000,
    onLimitExceeded:()=>{
        console.log("limit exceeded")
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