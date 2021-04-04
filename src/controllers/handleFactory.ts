import catchAsync from '../utils/catchAsync'
import AppError from '../utils/AppError'
import APIFeatures, { Option } from '../utils/APIFeatures'
import { resourceNeeded } from '../utils/helper'
import db from '../models/database'

export function deleteOne(Model) {
	return catchAsync(async (req, res, next) => {
		let doc = await Model.findByPk(req.params.id)
		if (!doc) {
			return next(new AppError('No document found with that ID', 404))
		}
		await doc.destroy()
		res.status(204).json({
			status: 'success',
			data: null,
		})
	})
}

export function updateOne(Model) {
	return catchAsync(async (req, res, next) => {
		let updated = await Model.findByPk(req.params.id)
		if (!updated) {
			return next(new AppError('No document found with that ID', 404))
		}
		for (let key in req.body) {
			updated[key] = req.body[key]
		}
		let doc = await updated.save()
		// populate the source and category of news document
		if (resourceNeeded(req.baseUrl) == 'news') {
			let source = await doc.getSource()
			source = JSON.parse(JSON.stringify(source))
			let category = await doc.getCategory()
			category = JSON.parse(JSON.stringify(category))
			doc = JSON.parse(JSON.stringify(doc))
			doc.source = source
			doc.category = category
			return res.status(201).json({
				status: 'success',
				data: doc,
			})
		}
		doc = JSON.parse(JSON.stringify(doc))
		res.status(200).json({
			status: 'success',
			data: doc,
		})
	})
}

export function createOne(Model) {
	return catchAsync(async (req, res, next) => {
		let doc = await Model.create(req.body)
		// populate the source and category of news document
		if (resourceNeeded(req.baseUrl) == 'news') {
			let source = await doc.getSource()
			source = JSON.parse(JSON.stringify(source))
			let category = await doc.getCategory()
			source = JSON.parse(JSON.stringify(source))
			doc = JSON.parse(JSON.stringify(doc))
			doc.source = source
			doc.category = category
			return res.status(201).json({
				status: 'success',
				data: doc,
			})
		}
		doc = JSON.parse(JSON.stringify(doc))
		res.status(201).json({
			status: 'success',
			data: doc,
		})
	})
}

export function getOne(Model) {
	return catchAsync(async (req, res, next) => {
		let option: Option = {}
		// populate the source and category of news document
		if (resourceNeeded(req.baseUrl) == 'news') {
			const { Source, Category } = db.sequelize.models
			option.include = [Source, Category]
		}
		let doc = await Model.findByPk(req.params.id, option)
		if (!doc) {
			return next(new AppError('No document found with that ID', 404))
		}
		doc = JSON.parse(JSON.stringify(doc))
		res.status(200).json({
			status: 'success',
			data: doc,
		})
	})
}

export function getAll(Model) {
	return catchAsync(async (req, res, next) => {
		let option: Option = {}
		// populate the source and category of news document
		if (resourceNeeded(req.baseUrl) == 'news') {
			const { Source, Category } = db.sequelize.models
			option.include = [Source, Category]
		}

		let features = new APIFeatures(option, req.query).filter().sort().limitFields().paginate()
		let doc = await Model.findAll(features.option)

		doc = JSON.parse(JSON.stringify(doc))
		// SEND RESPONSE
		res.status(200).json({
			status: 'success',
			results: doc.length,
			data: doc,
		})
	})
}
