import { message } from "telegraf/filters";
import { telegramMessageHandler } from "../../controllers/telegram";
import { telegramBot } from "../../utils/telegram";
import { DOMAIN } from "../../utils/telegram/config";


telegramBot.on(message('text'), telegramMessageHandler)

telegramBot.launch({
    webhook: {
        domain: DOMAIN,
        port: 3000,

    }
})

// Enable graceful stop
process.once('SIGINT', () => telegramBot.stop('SIGINT'));
process.once('SIGTERM', () => telegramBot.stop('SIGTERM'));

export const initTelegramRoutes = () => {

}