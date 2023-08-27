import { Context } from "grammy"

export const logger = (ctx: Context, next: any) => {
    console.log(ctx.chat)
    next()
}