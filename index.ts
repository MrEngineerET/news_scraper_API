require('dotenv').config()
import path from 'path'

import { registerBotHandler } from './src/telegramBot/bot'
import db, { checkDBConnection, synchronizeDB } from './src/models/database'
import app, { debugExpress } from './app'
const Scraper = require('./src/scraper/src/Scraper')

const PORT = process.env.PORT || 8080

// checks if the database is connected then relationship created then model is in sync with the database
checkDBConnection().then(() => synchronizeDB())

const server = app.listen(PORT, () => debugExpress(`Express app starts listening on PORT ${PORT}`))

// register the webhook url resource address to express app
// registerBotHandler(app)

setTimeout(() => {
	/** CASE -1- scraping using every configration file in the specified directory and saving it into the specied folder */
	// const configFileDir = path.join(__dirname, 'src', 'scraper/configs')
	// const fileSavingDir = path.join(__dirname, 'test')
	// let scraper = new Scraper(configFileDir, null, fileSavingDir)
	// scraper.run()
	/** CASE -2- scraping using every configration file in the specified directory and saving it into database  */
	// const configFileDir = path.join(__dirname, 'src', 'scraper/configs')
	// let NewsModel = db.sequelize.models.News
	// let scraper = new Scraper(configFileDir,NewsModel)
	// scraper.run()
	/** CASE -3- scraping only a single configration file and saving it into specified directory */
	// const configFile = path.join(__dirname, 'src', 'scraper/configs/enaconfig.json')
	// let scraper = new Scraper()
	// scraper.runSingle(configFile, null, __dirname)
	/** CASE -4- scraping only a single configration file and saving it into specified directory */
	const configFile = path.join(__dirname, 'src', 'scraper/configs/enaconfig.json')
	let scraper = new Scraper()
	let NewsModel = db.sequelize.models.News
	scraper.runSingle(configFile, NewsModel)
}, 5000)

process.on('unhandledRejection', err => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...')
	console.log(err)
	server.close(() => {
		process.exit(1)
	})
})

process.on('uncaughtException', err => {
	console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
	console.log(err.name, err.message)
	process.exit(1)
})
