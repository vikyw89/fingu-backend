"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const routes_1 = require("./routes");
const grammy_1 = require("grammy");
const telegram_1 = require("./utils/telegram");
(0, routes_1.initRoutes)();
console.log('server started');
// telegramBot.start()
exports.default = (0, grammy_1.webhookCallback)(telegram_1.telegramBot, "http");
