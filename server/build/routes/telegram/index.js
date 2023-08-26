"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTelegramRoutes = void 0;
const telegram_1 = require("../../controllers/telegram");
const telegram_2 = require("../../utils/telegram");
telegram_2.telegramBot.on("message", telegram_1.telegramMessageHandler);
// telegramBot.start()
const initTelegramRoutes = () => {
};
exports.initTelegramRoutes = initTelegramRoutes;
