import axios from 'axios'
import { checkDBConnection } from '../models/database'
const debugScript = require('debug')('debugScript')

export function deleteAllNews() {
	debugScript('Intializing deletion of all news')
	// get all news
	axios
		.get(`${process.env.URL}/news`)
		.then(newsResponse => {
			// select news id and store in an array
			const news = newsResponse.data.data
			let allId = news.map(news => news._id)
			// make a delete http request for each id stored in the array
			allId.forEach(id => {
				axios.delete(`${process.env.URL}/news/${id}`).then(_ => {
					debugScript('One News deleted')
				})
			})
		})
		.catch(error => {
			debugScript('Failed deleting all news')
		})
}
