import { askClarify, generatePrompt, pruneHistory } from "../../utils/clarifai";
import {  messageSchema, messagesSchema } from "../../utils/clarifai/types";
import { prisma } from "../../utils/prisma";

export const telegramMessageHandler = async (ctx: any, next:any) => {
    console.time('telegramMessageHandler');
    try {

        const name = ctx.message.from.first_name

        const telegramId = ctx.message.from.id.toString()

        const newText = JSON.stringify(ctx.message.text) as string
        console.log("🚀 ~ file: index.ts:13 ~ telegramMessageHandler ~ newText:", newText)
        
        const newMessage = {
            isUser: true,
            text: newText
        }

        let messageHistory = [newMessage]

        let userId = ""

        // get message history
        // if none, create the user

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
            
            messageHistory = pruneHistory({messages: messageHistory})
        }
        
        let newPrompt = ""
        
        if (messagesSchema.safeParse(messageHistory).success) {
            newPrompt = generatePrompt({ messages: messageHistory })
        }
        
        console.time('ask Clarify')

        const response = await askClarify({ name: name, messages: newPrompt })

        console.timeEnd('ask Clarify')
        const responseData = response.outputs[0].data.text.raw ?? "..."
        // send data to user
        ctx.reply(responseData)

        // await ctx.telegram.sendMessage(ctx.message.chat.id, responseData);
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