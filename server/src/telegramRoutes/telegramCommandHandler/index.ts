import { Context, NextFunction } from "grammy";
import { prisma } from "../../utils/prisma";

export const telegramCommandHandler = async (ctx: Context, next: NextFunction) => {
    if (!ctx.message) return
    const userTelegramId = ctx.message.from.id.toString()
    const command = ctx.message.text ?? "..."

    try {
        switch (command) {
            case '/reset': {
                let chatCount = 0

                const deletedChat = await prisma.telegramChat.deleteMany({
                    where: {
                        telegramId: userTelegramId
                    }
                })

                chatCount = deletedChat.count

                const resetWaiting = await prisma.telegram.update({
                    where: {
                        id: userTelegramId
                    },
                    data: {
                        isWaiting: false
                    }
                })

                ctx.reply(`Fingu had amnesia and forgotten ${chatCount} chats !`, { reply_to_message_id: ctx.message.message_id })
                break
            }
        }
    }
    catch (err) {

        console.log(err)

    }
}