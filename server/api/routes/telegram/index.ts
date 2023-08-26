import { telegramMessageHandler } from "../../controllers/telegram";
import { telegramBot } from "../../utils/telegram";

telegramBot.on("message", telegramMessageHandler)

export const initTelegramRoutes = () => {

}