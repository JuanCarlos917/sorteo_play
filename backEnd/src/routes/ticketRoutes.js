const express = require('express');
const {
	getAllTickets,
	createTickets,
	updateTicket,
	deleteTicket,
} = require('../controllers/ticketController');

const router = express.Router();

router.get('/', getAllTickets);
router.post('/', createTickets);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

module.exports = router;
