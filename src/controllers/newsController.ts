import db from '../models/database'
import * as factory from './handleFactory'

const models = db.sequelize.models

export const getAllNews = (req, res, next) => {
	return factory.getAll(models.News)(req, res, next)
}
export const getNews = (req, res, next) => {
	return factory.getOne(models.News)(req, res, next)
}
export const createNews = (req, res, next) => {
	return factory.createOne(models.News)(req, res, next)
}
export const updateNews = (req, res, next) => {
	return factory.updateOne(models.News)(req, res, next)
}
export const deleteNews = (req, res, next) => {
	return factory.deleteOne(models.News)(req, res, next)
}
