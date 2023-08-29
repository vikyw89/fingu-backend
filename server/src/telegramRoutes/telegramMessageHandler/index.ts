import { Context, NextFunction } from "grammy";
import { askClarify, generatePrompt, pruneHistory } from "../../utils/clarifai";
import { messageSchema, messagesSchema } from "../../utils/clarifai/types";
import { prisma } from "../../utils/prisma";
import { chatSplitter } from "../../utils/chatSplitter";

export const telegramMessageHandler = async (ctx: Context, next: NextFunction) => {
    console.time('telegramMessageHandler');
    if (!ctx.message) return

    try {
        const name = ctx.message.from.first_name

        const telegramId = ctx.message.from.id.toString()

        const newText = ctx.message.text

        const newMessage = {
            isUser: true,
            text: newText ?? "..."
        }

        let messageHistory = [newMessage]

        let userId = ""

        console.time('find history')

        const res = await prisma.user.findFirst({
            where: {
                telegramId: telegramId
            },
            select: {
                chatHistory: {
                    take: 100,
                    orderBy: {
                        createdAt: 'desc',
                    },
                    select: {
                        content: true
                    }
                },
                id: true
            }
        })

        console.timeEnd('find history')

        if (!res) {

            const res = await prisma.user.create({
                data: {
                    telegramId: telegramId
                }
            })

            userId = res.id

        } else {

            userId = res.id

            for (let i = 0; i < res.chatHistory.length; i++) {
                const content = res.chatHistory[i].content
                const message = messageSchema.safeParse(content)
                if (message.success) {
                    messageHistory.unshift(message.data)
                }
            }

            messageHistory = pruneHistory({ messages: messageHistory })
        }

        let newPrompt = ""

        if (messagesSchema.safeParse(messageHistory).success) {
            newPrompt = generatePrompt({ messages: messageHistory })
        }

        console.time('ask Clarify')

        const response = await askClarify({ name: name, messages: newPrompt })

        console.timeEnd('ask Clarify')

        const responseData = response?.outputs?.[0]?.data?.text?.raw ?? "..."

        const responseArr = chatSplitter(responseData)

        let delay = Math.random()*10000
        let index = 0

        while (index < responseArr.length) {
            const message = responseArr[index]
            ctx.reply(message, { parse_mode: 'Markdown' })
            ctx.api.sendChatAction(ctx.message.chat.id, "typing")
            index++
            await new Promise(r => setTimeout(r, delay))
        }

        const newResponse = {
            text: responseData,
            isUser: false
        }

        console.time('store history')

        // store new response into db
        await prisma.chat.createMany({
            data: [
                {
                    userId: userId,
                    content: newMessage
                },
                {
                    userId: userId,
                    content: newResponse
                }
            ]
        })

        console.timeEnd('store history')

        console.timeEnd('telegramMessageHandler');

    } catch (err) {

        console.log(err)

    }

}