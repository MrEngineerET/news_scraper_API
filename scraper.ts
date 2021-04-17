import path from 'path'

const Scraper = require('./src/scraper/src/Scraper')
const { synchSourceId } = require('./src/scraper/scripts/synchSourceId')
const { deleteAllNews } = require('./src/scripts/deleteAllNews')

export const startScraping = function (timeInterval) {
	setTimeout(() => {
		// synchSourceId()
		deleteAllNews()
		/** CASE -1- scraping using every configration file in the specified directory and saving it into the specied folder */
		// const configFileDir = path.join(__dirname, 'src', 'scraper/configs')
		// const fileSavingDir = path.join(__dirname, 'test')
		// Scraper.runScraper(configFileDir, fileSavingDir)
		/** CASE -2- scraping using every configration file in the specified directory and saving it into database  */
		// const configFileDir = path.join(__dirname, 'src', 'scraper/configs')
		// Scraper.runScraper(configFileDir)
		/** CASE -3- scraping only a single configration file and saving it into specified directory */
		// const configFile = path.join(__dirname, 'src', 'scraper/configs/enaconfig.json')
		// Scraper.runSingleScraper(configFile, __dirname)
		/** CASE -4- scraping only a single configration file and saving it into a database */
		const configFile = path.join(__dirname, 'src', 'scraper/configs/fanaConfig.json')
		Scraper.runSingleScraper(configFile)
	}, timeInterval)
}
