import { message } from "telegraf/filters";
import { telegramMessageHandler } from "../../controllers/telegram";
import { telegramBot } from "../../utils/telegram";


telegramBot.on(message('text'), telegramMessageHandler)

telegramBot.launch({
    webhook: {
        domain: 'https://myaddress.com',
        port: 3000,
        
    }
})

// Enable graceful stop
process.once('SIGINT', () => telegramBot.stop('SIGINT'));
process.once('SIGTERM', () => telegramBot.stop('SIGTERM'));

export const initTelegramRoutes = () => {

}