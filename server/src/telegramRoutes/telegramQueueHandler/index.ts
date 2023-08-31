import { Context, NextFunction } from "grammy";
import { prisma } from "../../utils/prisma";

export const telegramQueueHandler = async (ctx:Context,next:NextFunction) => {
    if (!ctx.message) return

    const fromTelegramId = ctx.message?.from.id.toString()

    // check for isWaiting
    let checkIsWaiting = await prisma.telegram.findFirst({
        where:{
            id:fromTelegramId
        },
        select:{
            isWaiting:true,
        }
    })

    // if it's first time user, id would be false
    if (!checkIsWaiting) {
        next()
    }

    // short polling the db
    // inneficient, will be updated to long polling or pubsub when scaling is needed
    while (checkIsWaiting?.isWaiting) {
        await new Promise(r => setTimeout(r, 10000))
        checkIsWaiting = await prisma.telegram.findFirst({
            where:{
                id:fromTelegramId
            },
            select:{
                isWaiting:true,
            }
        })
    }

    next()
}