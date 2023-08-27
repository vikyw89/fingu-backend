import "dotenv/config";
import { telegramBot } from "./utils/telegram";
import { initRoutes } from "./routes";
import { webhookCallback } from "grammy";

initRoutes()

console.log('server started')
// telegramBot.start()

export default webhookCallback(telegramBot,"http")