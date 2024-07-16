const express = require('express');
const {
	getAllTickets,
	createTickets,
	deleteTicket,
	reserveTicket,
} = require('../controllers/ticketController');

const router = express.Router();

router.get('/', getAllTickets);
router.post('/', createTickets);
router.delete('/:id', deleteTicket);
router.post('/reserve', reserveTicket);

module.exports = router;
