export default function (sequelize, DataTypes) {
	const Category = sequelize.define('Category', {
		_id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	})

	Category.associate = function (models) {
		Category.hasMany(models.News, { foreignKey: { name: 'category', allowNull: true } })
	}

	return Category
}
