"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
// import { telegramBot } from "./utils/telegram";
// import { initRoutes } from "./routes";
// import { webhookCallback } from "grammy";
// initRoutes()
// console.log('server started')
// export default webhookCallback(telegramBot,"http")
const grammy_1 = require("grammy");
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token)
    throw new Error("BOT_TOKEN is unset");
const bot = new grammy_1.Bot(token);
bot.on("message", (ctx) => {
    ctx.reply('helllo');
});
exports.default = (0, grammy_1.webhookCallback)(bot, "http");
