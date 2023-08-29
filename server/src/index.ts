console.time('express')
import "dotenv/config";
import { telegramBot } from "./utils/telegram";
import { initRoutes } from "./telegramRoutes";
import { Request, Response } from "express";
import express from "express";
import { webhookCallback } from "grammy";
import { TELEGRAM_BOT_TOKEN } from "./utils/telegram/config";

const port = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());

initRoutes()
telegramBot.start()
app.use(`/api/bot/${TELEGRAM_BOT_TOKEN}`, webhookCallback(telegramBot, "express"));
app.use("/api", (req:Request, res:Response) => {
    res.json('Welcome to Fingu!')
});

app.use((req:Request, res:Response) => res.status(200).send());
app.listen(port, () => console.log(`listening on port ${port}`));

console.timeEnd('express')