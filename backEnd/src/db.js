const { Sequelize } = require('sequelize');
const getDatabaseConfig = require('../config/database');

const environment = process.env.NODE_ENV || 'production';
const dbConfig = getDatabaseConfig(environment);

const sequelize = new Sequelize(
	dbConfig.name,
	dbConfig.user,
	dbConfig.password,
	{
		host: dbConfig.host,
		port: dbConfig.port,
		dialect: 'postgres',
		logging: false,
		native: false,
		dialectOptions: dbConfig.dialectOptions,
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
