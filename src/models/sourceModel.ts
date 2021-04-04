export default function (sequelize, DataTypes) {
	const Source = sequelize.define('Source', {
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
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		image: DataTypes.STRING,
	})

	Source.associate = function (models) {
		Source.hasMany(models.News, { foreignKey: { name: 'source', allowNull: true } })
	}

	return Source
}
