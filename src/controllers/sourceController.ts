import db from '../models/database'
import * as factory from './handleFactory'

const models = db.sequelize.models

export const getAllSource = (req, res, next) => {
	return factory.getAll(models.Source)(req, res, next)
}
export const getSource = (req, res, next) => {
	return factory.getOne(models.Source)(req, res, next)
}
export const createSource = (req, res, next) => {
	return factory.createOne(models.Source)(req, res, next)
}
export const updateSource = (req, res, next) => {
	return factory.updateOne(models.Source)(req, res, next)
}
export const deleteSource = (req, res, next) => {
	return factory.deleteOne(models.Source)(req, res, next)
}
