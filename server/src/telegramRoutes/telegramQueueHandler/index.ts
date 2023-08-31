import { Context, NextFunction } from "grammy";
import { prisma } from "../../utils/prisma";

/**
 * Handles the start of the Telegram queue.
 *
 * @param {Context} ctx - The context object.
 * @param {NextFunction} next - The next function to call.
 * @return {Promise<void>} This function does not return anything.
 */
export const telegramQueueStartHandler = async (ctx: Context, next: NextFunction) => {
    if (!ctx.message) return

    const fromTelegramId = ctx.message?.from.id.toString()
    ctx.replyWithChatAction('typing')
    // check for isWaiting
    try {
        let checkIsWaiting = await prisma.telegram.findFirst({
            where: {
                id: fromTelegramId
            },
            select: {
                isWaiting: true,
            }
        })

        // if it's first time user, id would be false
        if (!checkIsWaiting) {
            next()
        }

        // short polling the db
        // inneficient, will be updated to long polling or pubsub when scaling is needed
        while (checkIsWaiting?.isWaiting) {
            console.log("🚀 ~ file: index.ts:28 ~ telegramQueueHandler ~ checkIsWaiting:", checkIsWaiting)
            await new Promise(r => setTimeout(r, 10000))
            checkIsWaiting = await prisma.telegram.findFirst({
                where: {
                    id: fromTelegramId
                },
                select: {
                    isWaiting: true,
                }
            })
        }

        await prisma.telegram.upsert({
            where: {
                id: fromTelegramId
            },
            update: {
                isWaiting: true
            },
            create: {
                isWaiting: true,
                id: fromTelegramId
            }
        })


    }
    catch (err) {

        console.log(err)

    }
    finally{

        next()

    }
}


export const telegramQueueEndHandler = async (ctx: Context, next: NextFunction) => {
    if (!ctx.message) return

    const fromTelegramId = ctx.message?.from.id.toString()

    try {

        await prisma.telegram.update({
            where: {
                id: fromTelegramId
            },
            data: {
                isWaiting: false
            }
        })

    }
    catch (err) {

        console.log(err)
    }
}