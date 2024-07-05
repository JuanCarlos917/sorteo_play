const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	});

	return User;
};

// Descripción del Modelo User

// Este modelo define la estructura de la tabla Users en la base de datos utilizando Sequelize. La tabla Users se utiliza para almacenar información sobre los usuarios en un sistema de rifa. Cada registro en la tabla representa un usuario individual con las siguientes propiedades:

// 	•	name: Un campo de tipo cadena de caracteres que almacena el nombre del usuario. Este campo es obligatorio.
// 	•	email: Un campo de tipo cadena de caracteres que almacena la dirección de correo electrónico del usuario. Este campo es obligatorio y debe ser único, lo que significa que no puede haber dos usuarios con el mismo correo electrónico.
// 	•	phone: Un campo de tipo cadena de caracteres que almacena el número de teléfono del usuario. Este campo es obligatorio.
