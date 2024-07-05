const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
const appRoutes = require('./routes/index');
require('dotenv').config();

require('./db.js');

const server = express();

server.name = 'API';

// Configurar opciones de CORS
const corsOptions = {
  origin: `${process.env.BASE_URL}`,
  credentials: true,
  methods: 'GET, POST, OPTIONS, PUT, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
};

server.use(cors(corsOptions));

server.use(morgan('dev'));

server.use('/api', appRoutes);

server.use((err, req, res) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
