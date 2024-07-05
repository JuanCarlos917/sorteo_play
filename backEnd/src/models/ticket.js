const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Ticket = sequelize.define(
		'Ticket',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				unique: true,
			},
			number: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			status: {
				type: DataTypes.STRING,
				defaultValue: 'Disponible',
				allowNull: false,
			},
			buyerName: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			buyerContact: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			timestamps: false,
		},
	);
    return Ticket;
}

// Descripción del Modelo Ticket

// Este modelo define la estructura de la tabla Tickets en la base de datos utilizando Sequelize, un ORM para Node.js. La tabla Tickets se utiliza para gestionar los boletos en un sistema de rifa. Cada registro en la tabla representa un boleto individual con las siguientes propiedades:

// 	•	number: Un campo de cadena de caracteres que representa el número del boleto. Este campo es obligatorio y debe ser único.
// 	•	status: Un campo de cadena de caracteres que indica el estado del boleto. Tiene un valor predeterminado de 'Disponible' y es obligatorio.
// 	•	buyerName: Un campo de cadena de caracteres opcional que almacena el nombre del comprador del boleto.
// 	•	buyerContact: Un campo de cadena de caracteres opcional que almacena la información de contacto del comprador del boleto.
// 	•	timestamps: Esta opción está deshabilitada (false), lo que significa que las columnas createdAt y updatedAt no se agregarán automáticamente a la tabla.
