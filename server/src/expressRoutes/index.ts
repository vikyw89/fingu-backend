import { Router } from "express"
import { getAllTelegramUsers } from "./getAllTelegramUsers"
import { getAllUsers } from "./getAllUsers"
import { TELEGRAM_BOT_TOKEN } from "../utils/telegram/config"
import { webhookCallback } from "grammy"
import { telegramBot } from "../telegramRoutes"

const router = Router()

router.get("/telegram", getAllTelegramUsers)

router.get("/user", getAllUsers)

router.use(`/bot/${TELEGRAM_BOT_TOKEN}`, webhookCallback(telegramBot, "express"));

export { router }