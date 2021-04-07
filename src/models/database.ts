import { Sequelize, DataTypes } from 'sequelize'
import fs from 'fs'
import path from 'path'
import debug from 'debug'

interface Database {
	Sequelize?: any
	sequelize?: Sequelize
}
let db: Database = {}
const debugDatabase = debug('debugDatabase')

const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env
const sequelize = new Sequelize({
	dialect: 'mysql',
	database: DATABASE_NAME,
	// database: 'scraped_news',
	username: DATABASE_USERNAME,
	// username: 'root',
	password: DATABASE_PASSWORD,
	// password: '',
	logging: msg => debugDatabase(msg),
	define: { charset: 'utf8', collate: 'utf8_general_ci' },
})

//define all models found in __dirname
const basename = path.basename(module.filename)
fs.readdirSync(__dirname)
	.filter(function (file) {
		return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
	})
	.forEach(function (file) {
		const model = require(path.join(__dirname, file)).default(sequelize, DataTypes)
		db[model.name] = model
	})
debugDatabase('All database models are defined')

// excute the relationship
Object.keys(db).forEach(function (modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})
debugDatabase('all database models relationship are excuted')

// it checks if the database has successfully connected or throw and error if not
export async function checkDBConnection() {
	try {
		// check connection
		await sequelize.authenticate()
		debugDatabase('Connection has been established successfully.')
	} catch (error) {
		debugDatabase('Error Error :: Unable to connect to the database')
		throw Error(`Unable to connect to the database:, ${error}`)
	}
}
// it sychronize the database with the model definition
export async function synchronizeDB(option = {}) {
	sequelize
		.sync(option)
		.then(() => debugDatabase('All models are synchronized successfully'))
		.catch(error => {
			throw Error(`Unable to synchronize the models of the database ${error}`)
		})
}

db.Sequelize = Sequelize
db.sequelize = sequelize
export default db
