import { Context } from "telegraf"

export const logger = (ctx: Context, next: any) => {
    console.log(ctx.chat)
    next()
}