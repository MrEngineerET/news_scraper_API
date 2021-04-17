import path from 'path'
import express from 'express'
import logger from 'morgan'
import rateLimit from 'express-rate-limit'
import xss from 'xss-clean'

import route from './src/routes/index'
import AppError from './src/utils/AppError'
import globalErrorHandler from './src/controllers/errorControllers'
const debugExpress = require('debug')('debugExpress')
import bot from './bot'

const app = express()
debugExpress('Intializing application ...')

// Development logging
if (process.env.NODE_ENV === 'development') {
	app.use(logger('dev'))
}

// Set the bot API endpoint
app.use(bot.registerBotHandler())

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Limit requests from same API
const limiter = rateLimit({
	max: 200,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/', limiter)

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '50kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Data sanitization against XSS
app.use(xss())

// register the webhook url resource address to express app
app.use('/', route)

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler)

export default app
export { debugExpress }
