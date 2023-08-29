import { Context, NextFunction } from "grammy";
import { prisma } from "../../utils/prisma";

export const telegramCommandHandler = async (ctx: Context, next: NextFunction) => {
    if (!ctx.message) return
    const userTelegramId = ctx.message.from.id
    const command = ctx.message.text

    try {
        switch (command) {
            case '/reset': {
                const userId = await prisma.user.findFirst({
                    where: {
                        telegramId: userTelegramId.toString()
                    },
                    select: {
                        id: true
                    }
                })
                let chatCount = 0
                if (userId) {
                    const deletedChat = await prisma.chat.deleteMany({
                        where:{
                            userId:userId?.id
                        }
                    })
                    chatCount = deletedChat.count
                } 
                ctx.reply(`Deleted ${chatCount} chats !`, { reply_to_message_id: ctx.message.message_id })
                break
            }
        }
    }
    catch (err) {


    }

}