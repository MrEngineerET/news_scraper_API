import express from 'express'
import * as newsController from '../controllers/newsController'

const newsRoutes = express.Router()

newsRoutes.route('/').get(newsController.getAllNews).post(newsController.createNews)

newsRoutes
	.route('/:id')
	.get(newsController.getNews)
	.patch(newsController.updateNews)
	.delete(newsController.deleteNews)
export default newsRoutes
