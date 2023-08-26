import { webhookCallback } from "grammy";
import { telegramMessageHandler } from "../../controllers/telegram";
import { telegramBot } from "../../utils/telegram";

telegramBot.on("message", telegramMessageHandler)

// telegramBot.start()

export const initTelegramRoutes = () => {

}