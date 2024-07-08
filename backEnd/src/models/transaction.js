const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Transaction = sequelize.define('Transaction', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true,
		},
		user_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		ticket_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		transaction_type: {
			type: DataTypes.ENUM('purchase', 'cancellation', 'change'),
			allowNull: false,
		},
	});

	return Transaction;
};

// Descripción del Modelo Transaction

// Este modelo define la estructura de la tabla Transactions en la base de datos utilizando Sequelize. La tabla Transactions se utiliza para registrar las transacciones relacionadas con los boletos en un sistema de rifa. Cada registro en la tabla representa una transacción individual con las siguientes propiedades:

// 	•	user_id: Un campo de tipo entero que representa el ID del usuario que realiza la transacción. Este campo es obligatorio.
// 	•	ticket_id: Un campo de tipo entero que representa el ID del boleto relacionado con la transacción. Este campo es obligatorio.
// 	•	transaction_type: Un campo de tipo enumeración (ENUM) que indica el tipo de transacción realizada. Puede ser 'purchase' (compra), 'cancellation' (cancelación) o 'change' (cambio). Este campo es obligatorio.
