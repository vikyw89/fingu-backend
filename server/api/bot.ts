import "dotenv/config";
import { telegramBot } from "./utils/telegram";
import { initRoutes } from "./routes";
import { webhookCallback } from "grammy";

initRoutes()

console.log('server started')

export default webhookCallback(telegramBot,"http")




// import { Bot, webhookCallback } from "grammy";

// const token = process.env.BOT_TOKEN;
// if (!token) throw new Error("BOT_TOKEN is unset");

// const bot = new Bot(token);

// export default webhookCallback(bot, "http");