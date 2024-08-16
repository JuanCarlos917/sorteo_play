require('dotenv').config();
const { Sequelize } = require('sequelize');

// Determina el entorno actual, por defecto es 'production'
const environment = process.env.NODE_ENV || 'production';

// Configuración de la base de datos dependiendo del entorno
let DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, dialectOptions;

if (environment === 'development') {
	DB_NAME = process.env.DB_NAME_DEV;
	DB_USER = process.env.DB_USER;
	DB_PASSWORD = process.env.DB_PASSWORD;
	DB_HOST = process.env.DB_HOST;
	DB_PORT = process.env.DB_PORT;
	dialectOptions = {};
} else if (environment === 'test') {
	DB_NAME = process.env.DB_NAME_TEST;
	DB_USER = process.env.DB_USER;
	DB_PASSWORD = process.env.DB_PASSWORD;
	DB_HOST = process.env.DB_HOST;
	DB_PORT = process.env.DB_PORT;
	dialectOptions = {};
} else {
	// Producción por defecto
	DB_NAME = process.env.DB_PROD_NAME;
	DB_USER = process.env.DB_PROD_USER;
	DB_PASSWORD = process.env.DB_PROD_PASSWORD;
	DB_HOST = process.env.DB_PROD_HOST;
	DB_PORT = process.env.DB_PROD_PORT;
	dialectOptions = {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	};
}

// Configura Sequelize
const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
	{
		logging: false,
		native: false,
		dialectOptions,
	},
);

// Prueba la conexión a la base de datos
sequelize
	.authenticate()
	.then(() => {
		console.log(`Connection to ${environment} database is successful.`);
	})
	.catch((err) => {
		console.error('Unable to connect to the DB:', err);
	});

module.exports = sequelize;
