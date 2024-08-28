'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Tickets', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
				unique: true,
			},
			number: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			status: {
				type: Sequelize.ENUM('Disponible', 'Reservado', 'Vendida'),
				allowNull: false,
				defaultValue: 'Disponible',
			},
			buyerName: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			buyerContact: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			buyerEmail: {
				type: Sequelize.STRING,
				allowNull: true,
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
		// Eliminar la tabla Tickets y el tipo ENUM utilizado
		await queryInterface.dropTable('Tickets');
		await queryInterface.sequelize.query(
			'DROP TYPE IF EXISTS "enum_Tickets_status";',
		);
	},
};
