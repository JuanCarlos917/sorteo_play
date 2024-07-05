require('dotenv').config();
const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';

// variables de entorno para desarrollo o producción
const DB_USER = isProduction ? process.env.DB_PROD_USER : process.env.DB_USER;
const DB_PASSWORD = isProduction
  ? process.env.DB_PROD_PASSWORD
  : process.env.DB_PASSWORD;
const DB_HOST = isProduction ? process.env.DB_PROD_HOST : process.env.DB_HOST;
const DB_PORT = isProduction ? process.env.DB_PROD_PORT : process.env.DB_PORT;
const DB_NAME = isProduction ? process.env.DB_PROD_NAME : process.env.DB_NAME;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
    dialectOptions: isProduction
      ? {
        ssl: {
           require: true,
          rejectUnauthorized: false, // Esto es necesario si estás usando un certificado autofirmado; para un certificado válido, deberías usar 'true'
        },
      }
      : {},
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to DB is successful.');
  })
  .catch((err) => {
    console.error('Unable to connect to the DB:', err);
  });

module.exports = sequelize;
