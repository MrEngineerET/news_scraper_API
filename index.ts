require('dotenv').config()

import { checkDBConnection, synchronizeDB } from './src/models/database'
// express application
import app, { debugExpress } from './app'
// scraper
import { startScraping } from './scraper'

const PORT = process.env.PORT || 8080

// checks if the database is connected then relationship created then model is in sync with the database
checkDBConnection().then(() => synchronizeDB())

const server = app.listen(PORT, () => debugExpress(`Express app starts listening on PORT ${PORT}`))

startScraping(5000)

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
