import { TELEGRAM_BOT_TOKEN } from "./config"
import { Bot } from 'grammy';


export const telegramBot = new Bot(TELEGRAM_BOT_TOKEN)