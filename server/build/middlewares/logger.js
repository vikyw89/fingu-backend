"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (ctx, next) => {
    console.log(ctx.chat);
    next();
};
exports.logger = logger;
