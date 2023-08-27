"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.telegramMessageHandler = void 0;
const clarifai_1 = require("../../utils/clarifai");
const types_1 = require("../../utils/clarifai/types");
const prisma_1 = require("../../utils/prisma");
const telegramMessageHandler = async (ctx, next) => {
    try {
        const name = ctx.message.from.first_name;
        const telegramId = ctx.message.from.id.toString();
        const newText = ctx.message.text;
        const newMessage = {
            isUser: true,
            text: newText
        };
        let messageHistory = [newMessage];
        let userId = "";
        // get message history
        // if none, create the user
        const res = await prisma_1.prisma.user.findFirst({
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
        });
        if (!res) {
            const res = await prisma_1.prisma.user.create({
                data: {
                    telegramId: telegramId
                }
            });
            userId = res.id;
        }
        else {
            userId = res.id;
            for (let i = 0; i < res.chatHistory.length; i++) {
                const content = res.chatHistory[i].content;
                const message = types_1.messageSchema.safeParse(content);
                if (message.success) {
                    messageHistory.unshift(message.data);
                }
            }
            messageHistory = (0, clarifai_1.pruneHistory)({ messages: messageHistory });
        }
        let newPrompt = "";
        if (types_1.messagesSchema.safeParse(messageHistory).success) {
            newPrompt = (0, clarifai_1.generatePrompt)({ messages: messageHistory });
        }
        const response = await (0, clarifai_1.askClarify)({ name: name, messages: newPrompt });
        const responseData = response.outputs[0].data.text.raw;
        // send data to user
        await ctx.reply(responseData);
        // await ctx.telegram.sendMessage(ctx.message.chat.id, responseData);
        const newResponse = {
            text: responseData,
            isUser: false
        };
        // store new response into db
        await prisma_1.prisma.chat.createMany({
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
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.telegramMessageHandler = telegramMessageHandler;
