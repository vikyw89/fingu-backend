import { webhookCallback } from "grammy";
import { telegramMessageHandler } from "../../controllers/telegram";
import { telegramBot } from "../../utils/telegram";

telegramBot.on("message", telegramMessageHandler)

// telegramBot.start()
export default webhookCallback(telegramBot, "http");
export const initTelegramRoutes = () => {

}