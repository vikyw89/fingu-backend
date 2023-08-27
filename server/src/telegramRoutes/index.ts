import { logger } from "../telegramMiddlewares/logger"
import { telegramBot } from "../utils/telegram"
import { telegramMessageHandler } from "./telegramMessageHandler"

telegramBot.use(logger)
telegramBot.on("message", telegramMessageHandler)

export const initRoutes = () => { }