import { Context, NextFunction } from "grammy";

/**
 * Handles the Telegram file request by replying with a message and calling the next middleware.
 *
 * @param {Context} ctx - the context object representing the Telegram request
 * @param {NextFunction} next - the function to call the next middleware
 */
export const telegramFileHandler = async (ctx: Context, next: NextFunction) => {

    ctx.reply("Sorry, I can't read a file yet...")
    
    next()
}