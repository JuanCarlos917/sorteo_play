require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const appRoutes = require('./routes/index');
const authRoutes = require('./routes/adminRoutes.js');
require('./db.js');

const server = express();

server.name = 'API';

// Configurar opciones de CORS
const corsOptions = {
	origin: process.env.BASE_URL,
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
