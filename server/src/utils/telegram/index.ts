import { Telegraf } from 'telegraf';
import { TELEGRAM_BOT_TOKEN } from "./config"

export const telegramBot = new Telegraf(TELEGRAM_BOT_TOKEN);