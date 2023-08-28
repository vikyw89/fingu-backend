import { Context, NextFunction } from "grammy";

export const telegramFileHandler = async (ctx: Context, next: NextFunction) => {
    console.log("🚀 ~ file: index.ts:4 ~ telegramFileHandler ~ ctx:", ctx)
    next()
}