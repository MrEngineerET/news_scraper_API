import Bot from './src/telegramBot/src/Bot'

const bot = new Bot(process.env.BOT_TOKEN)
bot.configureWebhook()
export default bot
