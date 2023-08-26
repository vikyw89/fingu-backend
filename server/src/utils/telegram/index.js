"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.telegramBot = void 0;
var telegraf_1 = require("telegraf");
var config_1 = require("./config");
exports.telegramBot = new telegraf_1.Telegraf(config_1.TELEGRAM_BOT_TOKEN);
