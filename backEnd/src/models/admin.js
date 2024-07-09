const { DataTypes } = require('sequelize');

//Este modelo representa el usuario admin del proyecto, el que se encarga de agregar, modificar, eliminar etc. La informacion del portafoio.

module.exports = (sequelize) => {
	sequelize.define(
		'Admin',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [8],
				},
			},
			resetPasswordToken: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			resetPasswordExpires: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			timestamps: false,
		},
	);
};
