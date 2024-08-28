const sequelize = require('../src/db');

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
			await sequelize.sync({ force: true });

			console.log('Connection to test database is successful.');
		} catch (error) {
			console.error('Error syncing database:', error);
		}
	}
});

afterEach(async () => {
	try {
		// Truncar las tablas después de cada prueba
		await sequelize.query(
			'TRUNCATE "Transactions" RESTART IDENTITY CASCADE',
		);
		await sequelize.query('TRUNCATE "Tickets" RESTART IDENTITY CASCADE');
		await sequelize.query('TRUNCATE "Users" RESTART IDENTITY CASCADE');
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
