import express from 'express'
import * as categoryController from '../controllers/categoryController'

const categoryRoutes = express.Router()

categoryRoutes
	.route('/')
	.get(categoryController.getAllCategory)
	.post(categoryController.createCategory)

categoryRoutes
	.route('/:id')
	.get(categoryController.getCategory)
	.patch(categoryController.updateCategory)
	.delete(categoryController.deleteCategory)
export default categoryRoutes
