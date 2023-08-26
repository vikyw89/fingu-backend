import { message } from "telegraf/filters";
import { telegramMessageHandler } from "../../controllers/telegram";
import { telegramBot } from "../../utils/telegram";
import { logger } from "../../middlewares/logger";


telegramBot.on(message('text'), telegramMessageHandler)

telegramBot.use(logger)


telegramBot.launch();

// Enable graceful stop
process.once('SIGINT', () => telegramBot.stop('SIGINT'));
process.once('SIGTERM', () => telegramBot.stop('SIGTERM'));

export const initTelegramRoutes = () => {

}