import db from '../models/database'
import * as factory from './handleFactory'

const models = db.sequelize.models

export const getAllCategory = (req, res, next) => {
	return factory.getAll(models.Category)(req, res, next)
}
export const getCategory = (req, res, next) => {
	return factory.getOne(models.Category)(req, res, next)
}
export const createCategory = (req, res, next) => {
	return factory.createOne(models.Category)(req, res, next)
}
export const updateCategory = (req, res, next) => {
	return factory.updateOne(models.Category)(req, res, next)
}
export const deleteCategory = (req, res, next) => {
	return factory.deleteOne(models.Category)(req, res, next)
}
