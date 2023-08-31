import { Context, NextFunction } from "grammy";
import { askClarifai, generatePrompt, pruneHistory } from "../../utils/clarifai";
import { messageSchema, messagesSchema } from "../../utils/clarifai/types";
import { prisma } from "../../utils/prisma";
import { chatSplitter } from "../../utils/chatSplitter";

/**
 * Handles incoming Telegram messages.
 *
 * @param {Context} ctx - The context object containing the Telegram message.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 */
export const telegramMessageHandler = async (ctx: Context, next: NextFunction) => {
    console.time('telegramMessageHandler');
    
    if (!ctx?.message) return
    ctx.replyWithChatAction('typing')

    const fromTelegramId = ctx.message.from.id.toString()

    const message = ctx.message.text ?? "..."
    
    const fromName = ctx.message.from.first_name ?? "anonymous"

    const newMessage = {
        isUser: true,
        text: ctx.message.text ?? "..."
    }

    try {

        let messageHistory = [newMessage]

        console.time('find history')

        const res = await prisma.telegram.findFirst({
            where: {
                id: fromTelegramId
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
            }
        })

        console.timeEnd('find history')

        const chatHistory = res?.chatHistory ?? []

        for (let i = 0; i < chatHistory.length; i++) {
            const content = chatHistory[i].content
            const parsedContent = messageSchema.safeParse(content)
            if (parsedContent.success) {
                messageHistory.unshift(parsedContent.data)
            }
        }

        messageHistory = pruneHistory({ messages: messageHistory })

        let newPrompt = ""

        if (messagesSchema.safeParse(messageHistory).success) {
            newPrompt = generatePrompt({ messages: messageHistory })
        }

        console.time('ask Clarify')

        const response = await askClarifai({ name: fromName, messages: newPrompt })

        console.timeEnd('ask Clarify')

        const responseData = response?.outputs?.[0]?.data?.text?.raw ?? "..."

        const newResponse = {
            text: responseData,
            isUser: false
        }

        const responseArr = chatSplitter(responseData)

        let index = 0

        while (index < responseArr.length) {
            const message = responseArr[index]
            if (index === 0) {
                ctx.reply(message, { parse_mode: 'Markdown',reply_to_message_id: ctx.message.message_id })
            } else {
                ctx.reply(message, { parse_mode: 'Markdown' })
            }
            ctx.replyWithChatAction('typing')
            index++
            await new Promise(r => setTimeout(r, (responseArr[index + 1] ?? []).length * 10))
        }

        // store chatRound into DB
        const storedChat = await prisma.telegramChat.createMany({
            data:[
                {
                    telegramId: fromTelegramId,
                    content: newMessage,
                },
                {
                    telegramId:fromTelegramId,
                    content:newResponse
                }
            ]
        })

        console.timeEnd('telegramMessageHandler');

    } catch (err) {

        console.log(err)

    }
    finally{

        next()

    }

}