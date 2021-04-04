export interface Option {
	where?: object
	order?: string[][]
	fields?: string
	attributes?: string[]
	offset?: number
	limit?: number
	include?: any
}
export interface QueryObject {
	sort: string
	fields: string
	page: any
	limit: any
}

export default class APIFeatures {
	option: Option
	queryObject: QueryObject
	constructor(option, queryObject) {
		this.option = option
		this.queryObject = queryObject
	}

	filter() {
		const queryObj = { ...this.queryObject }
		const excludedFields = ['page', 'sort', 'limit', 'fields']
		excludedFields.forEach(el => delete queryObj[el])

		if (!this.option.where) this.option.where = {}

		for (let key in queryObj) {
			this.option.where[key] = queryObj[key]
		}

		return this
	}

	sort() {
		this.option.order = []
		if (this.queryObject.sort) {
			let sortBy = this.queryObject.sort.split(',')
			sortBy.forEach(s => this.option.order.push([s, 'ASC']))
		} else {
			this.option.order.push(['createdAt', 'ASC'])
		}
		return this
	}

	limitFields() {
		if (this.queryObject.fields) {
			const fields = this.queryObject.fields.split(',')
			this.option.attributes = []
			fields.forEach(field => {
				this.option.attributes.push(field)
			})
		}
		return this
	}

	paginate() {
		const page = this.queryObject.page * 1 || 1
		const limit = this.queryObject.limit * 1 || 100
		const offset = (page - 1) * limit

		this.option.offset = offset
		this.option.limit = limit
		// this.query = this.query.skip(offset).limit(limit)

		return this
	}
}
