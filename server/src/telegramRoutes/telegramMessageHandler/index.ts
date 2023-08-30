import { Context, NextFunction } from "grammy";
import { askClarify, generatePrompt, pruneHistory } from "../../utils/clarifai";
import { Message, messageSchema, messagesSchema } from "../../utils/clarifai/types";
import { prisma } from "../../utils/prisma";
import { chatSplitter } from "../../utils/chatSplitter";

export const telegramMessageHandler = async (ctx: Context, next: NextFunction) => {
    console.time('telegramMessageHandler');

    if (!ctx?.message) return

    const replyToMessage = ctx.message.reply_to_message?.text

    const newText = ctx.message.text
    
    const newMessage = {
        isUser: true,
        text: newText ?? "..."
    }

    const name = ctx.message.from.first_name

    const telegramId = ctx.message.from.id.toString()

    try {
        
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
        
        if (replyToMessage) {
            await prisma.chat.create({
                data: {
                    userId:userId,
                    content: {
                        text: replyToMessage,
                        isUser: false
                    }
                }
            })
        }
        
        const savedNewMessage = await prisma.chat.create({
            data:{
                userId: userId,
                content: newMessage
            }
        })
        
        let newPrompt = ""

        if (messagesSchema.safeParse(messageHistory).success) {
            newPrompt = generatePrompt({ messages: messageHistory })
        }

        console.time('ask Clarify')

        const response = await askClarify({ name: name, messages: newPrompt })

        console.timeEnd('ask Clarify')

        const responseData = response?.outputs?.[0]?.data?.text?.raw ?? "..."

        const newResponse = {
            text: responseData,
            isUser: false
        }

        // store new response into db
        const savedNewResponse = await prisma.chat.create({
            data: {
                userId: userId,
                content: newResponse
            }
        })

        const responseArr = chatSplitter(responseData)

        let index = 0

        while (index < responseArr.length) {
            const message = responseArr[index]
            ctx.reply(message, { parse_mode: 'Markdown' })
            ctx.api.sendChatAction(ctx.message.chat.id, "typing")
            index++
            await new Promise(r => setTimeout(r, (responseArr[index+1] ?? []).length * 10))
        }

        console.timeEnd('telegramMessageHandler');

    } catch (err) {

        console.log(err)

    }

}