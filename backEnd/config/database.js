require('dotenv').config();

const getDatabaseConfig = (env) => {
	switch (env) {
		case 'development':
			return {
				name: process.env.DB_NAME_DEV,
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				host: process.env.DB_HOST,
				port: process.env.DB_PORT,
				dialectOptions: {},
			};
		case 'test':
			return {
				name: process.env.DB_NAME_TEST,
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				host: process.env.DB_HOST,
				port: process.env.DB_PORT,
				dialectOptions: {},
			};
		case 'production':
		default:
			return {
				name: process.env.DB_PROD_NAME,
				user: process.env.DB_PROD_USER,
				password: process.env.DB_PROD_PASSWORD,
				host: process.env.DB_PROD_HOST,
				port: process.env.DB_PROD_PORT,
				dialectOptions: {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
				},
			};
	}
};

module.exports = getDatabaseConfig;
