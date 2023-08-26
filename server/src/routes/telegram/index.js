"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTelegramRoutes = void 0;
var filters_1 = require("telegraf/filters");
var telegram_1 = require("../../controllers/telegram");
var telegram_2 = require("../../utils/telegram");
telegram_2.telegramBot.on((0, filters_1.message)('text'), telegram_1.telegramMessageHandler);
telegram_2.telegramBot.launch({
    webhook: {
        domain: 'https://myaddress.com',
        port: 3000,
    }
});
// Enable graceful stop
process.once('SIGINT', function () { return telegram_2.telegramBot.stop('SIGINT'); });
process.once('SIGTERM', function () { return telegram_2.telegramBot.stop('SIGTERM'); });
var initTelegramRoutes = function () {
};
exports.initTelegramRoutes = initTelegramRoutes;
