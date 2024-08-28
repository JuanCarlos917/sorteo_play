const { sequelize } = require('../src/db');
const { Ticket, User, Transaction } = require('../src/index');

// Limpiar mocks antes de cada prueba
beforeEach(() => {
	jest.clearAllMocks();
	jest.resetModules();
});

beforeAll(async () => {
	if (process.env.NODE_ENV === 'test') {
		try {
			// Eliminar tipos ENUM que podrían causar conflictos
			await sequelize.query(
				'DROP TYPE IF EXISTS "enum_Transactions_transaction_type" CASCADE',
			);

			// Sincronizar tablas en el orden correcto
			await User.sync({ force: true });
			await Ticket.sync({ force: true });
			await Transaction.sync({ force: true });

			console.log('Connection to test database is successful.');
		} catch (error) {
			console.error('Error syncing database:', error);
		}
	}
});

afterEach(async () => {
	try {
		// Evitar deadlocks al truncar las tablas
		await Transaction.destroy({ where: {}, truncate: true });
		await Ticket.destroy({ where: {}, truncate: true });
		await User.destroy({ where: {}, truncate: true });
		console.log('Database truncated successfully.');
	} catch (error) {
		console.error('Error truncating database:', error);
	}
});

afterAll(async () => {
	try {
		await sequelize.close(); // Cierra la conexión después de todas las pruebas
		console.log('Database connection closed.');
	} catch (error) {
		console.error('Error closing database connection:', error);
	}
});
