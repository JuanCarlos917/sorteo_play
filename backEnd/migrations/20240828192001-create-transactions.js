'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Transactions', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
				unique: true,
			},
			user_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Users', // Nombre de la tabla referenciada
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			ticket_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Tickets', // Nombre de la tabla referenciada
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			transaction_type: {
				type: Sequelize.ENUM('purchase', 'cancellation', 'change'),
				allowNull: false,
			},
			paymentMethod: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('NOW'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('NOW'),
			},
		});
	},

	async down(queryInterface, Sequelize) {
		// Eliminar la tabla Transactions y el tipo ENUM utilizado
		await queryInterface.dropTable('Transactions');
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_Transactions_transaction_type";',
		);
	},
};
