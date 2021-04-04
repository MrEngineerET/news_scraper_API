import express from 'express'
import * as sourceController from '../controllers/sourceController'

const sourceRoutes = express.Router()

sourceRoutes.route('/').get(sourceController.getAllSource).post(sourceController.createSource)

sourceRoutes
	.route('/:id')
	.get(sourceController.getSource)
	.patch(sourceController.updateSource)
	.delete(sourceController.deleteSource)
export default sourceRoutes
