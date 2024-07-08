const express = require('express');
const {
	getAllTransactions,
	createTransaction,
	cancelTransaction,
	changeTicket,
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/', getAllTransactions);
router.post('/', createTransaction);
router.post('/cancel/:id', cancelTransaction);
router.post('/change', changeTicket);

module.exports = router;
