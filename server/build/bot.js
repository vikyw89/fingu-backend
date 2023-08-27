"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const telegram_1 = require("./utils/telegram");
const routes_1 = require("./routes");
// import { webhookCallback } from "grammy";
(0, routes_1.initRoutes)();
console.log('server started');
telegram_1.telegramBot.start();
// export default webhookCallback(telegramBot,"http")
