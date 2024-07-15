const express = require('express');
const {
	getAllTickets,
	createTickets,
	updateTicket,
	deleteTicket,
	changeTicket,
	reserveTicket,
} = require('../controllers/ticketController');

const router = express.Router();

router.get('/', getAllTickets);
router.post('/', createTickets);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);
router.post('/change', changeTicket);
router.post('/reserve', reserveTicket);

module.exports = router;
