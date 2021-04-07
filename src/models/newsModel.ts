export default function (sequelize, DataTypes) {
	const News = sequelize.define('News', {
		_id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		url: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		title: {
			type: DataTypes.TEXT,
		},
		author: DataTypes.STRING,
		article: {
			type: DataTypes.TEXT,
		},
		image: DataTypes.STRING,
		posted: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		archived: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		date: DataTypes.DATE,
	})

	News.associate = function (models) {
		News.belongsTo(models.Source, { foreignKey: { name: 'source', allowNull: true } })
		News.belongsTo(models.Category, { foreignKey: { name: 'category', allowNull: true } })
	}

	return News
}
