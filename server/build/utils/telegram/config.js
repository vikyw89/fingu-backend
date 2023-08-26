"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMAIN = exports.PORT = exports.TELEGRAM_BOT_TOKEN = void 0;
exports.TELEGRAM_BOT_TOKEN = (_a = process.env.TELEGRAM_BOT_TOKEN) !== null && _a !== void 0 ? _a : "";
exports.PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3000;
exports.DOMAIN = (_c = process.env.DOMAIN) !== null && _c !== void 0 ? _c : "http://localhost:3000/";
