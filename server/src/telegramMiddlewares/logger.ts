import { Context } from "grammy"

/**
 * Logs the given context and calls the next function.
 *
 * @param {Context} ctx - The context to be logged.
 * @param {Function} next - The next function to be called.
 */
export const logger = (ctx: Context, next: any) => {
    console.log("🚀 ~ file: logger.ts:4 ~ logger ~ ctx:", ctx)
    next()
}