"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.telegramBot = void 0;
const config_1 = require("./config");
const grammy_1 = require("grammy");
exports.telegramBot = new grammy_1.Bot(config_1.TELEGRAM_BOT_TOKEN);
