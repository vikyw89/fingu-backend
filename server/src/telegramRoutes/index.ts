import { Context, NextFunction } from "grammy"
import { logger } from "../telegramMiddlewares/logger"
import { telegramBot } from "../utils/telegram"
import { telegramFileHandler } from "./telegramFileHandler"
import { telegramMessageHandler } from "./telegramMessageHandler"

telegramBot.use(logger)
telegramBot.on("message:text", telegramMessageHandler)
telegramBot.on("message:file", telegramFileHandler)
telegramBot.use((ctx:Context, next:NextFunction)=>{
    ctx.reply("...")
})

export const initRoutes = () => { }