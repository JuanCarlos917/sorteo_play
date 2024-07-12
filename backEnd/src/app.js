const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const appRoutes = require('./routes/index');
const authRoutes = require('./routes/adminRoutes.js');
require('dotenv').config();
require('./db.js');

const server = express();

server.name = 'API';

// Configurar opciones de CORS
const allowedOrigins = [
	`${process.env.BASE_URL}`,
	'https://otra-url-permitida.com',
];

const corsOptions = {
	origin: (origin, callback) => {
		// Allow requests with no origin, like mobile apps or curl requests
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) === -1) {
			const msg =
				'The CORS policy for this site does not allow access from the specified Origin.';
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	},
	credentials: true,
	methods: 'GET, POST, OPTIONS, PUT, DELETE',
	allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
};

server.use(cors(corsOptions));
server.use(morgan('dev'));

// Configurar body-parser para manejar solicitudes JSON y urlencoded
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Usar las rutas definidas en appRoutes
server.use('/api', appRoutes);
server.use('/auth', authRoutes);

// Middleware de error
server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
