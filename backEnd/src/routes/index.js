const express = require('express');
const userRoutes = require('./userRoutes');
const ticketRoutes = require('./ticketRoutes');
const transactionRoutes = require('./transactionRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/tickets', ticketRoutes);
router.use('/transactions', transactionRoutes);


module.exports = router;
