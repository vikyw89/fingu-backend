import { Context, NextFunction } from "grammy";

/**
 * Executes a chat action and calls the next middleware function.
 *
 * @param {Context} ctx - The context object.
 * @param {NextFunction} next - The next middleware function.
 */
export const chatAction = async(ctx: Context,next:NextFunction) => {
    const chatId = ctx.update.message?.chat.id
    if (!chatId) return
    ctx.api.sendChatAction(chatId, "typing")
    next()
}