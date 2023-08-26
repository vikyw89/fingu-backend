import "dotenv/config";
import { initRoutes } from "./routes";
import { webhookCallback } from "grammy";
import { telegramBot } from "./utils/telegram";

initRoutes()

console.log('server started')

export default webhookCallback(telegramBot,"http")




