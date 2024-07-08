const { Transaction, Ticket } = require('../index');

// Obtener todas las transacciones
const getAllTransactions = async (req, res) => {
	try {
		const transactions = await Transaction.findAll();
		res.status(200).json(transactions);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching transactions' });
	}
};

// Crear una nueva transacción (compra)
const createTransaction = async (req, res) => {
	const { user_id, ticket_id, transaction_type } = req.body;
	try {
		if (transaction_type === 'purchase') {
			const ticket = await Ticket.findByPk(ticket_id);
			if (ticket && ticket.status === 'Disponible') {
				ticket.status = 'Vendida';
				await ticket.save();
				const newTransaction = await Transaction.create({
					user_id,
					ticket_id,
					transaction_type,
				});
				res.status(201).json(newTransaction);
			} else {
				res.status(400).json({
					error: 'Ticket not available for purchase',
				});
			}
		} else {
			res.status(400).json({
				error: 'Invalid transaction type for this endpoint',
			});
		}
	} catch (error) {
		res.status(500).json({ error: 'Error creating transaction' });
	}
};

// Cancelar una compra de ticket
const cancelTransaction = async (req, res) => {
	const { id } = req.params;
	try {
		const transaction = await Transaction.findByPk(id);
		if (transaction && transaction.transaction_type === 'purchase') {
			const ticket = await Ticket.findByPk(transaction.ticket_id);
			if (ticket) {
				ticket.status = 'Disponible';
				await ticket.save();
				const newTransaction = await Transaction.create({
					user_id: transaction.user_id,
					ticket_id: transaction.ticket_id,
					transaction_type: 'cancellation',
				});
				res.status(201).json(newTransaction);
			} else {
				res.status(404).json({ error: 'Ticket not found' });
			}
		} else {
			res.status(404).json({ error: 'Purchase transaction not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error canceling transaction' });
	}
};

// Cambiar un ticket
const changeTicket = async (req, res) => {
	const { user_id, old_ticket_id, new_ticket_id } = req.body;
	try {
		const oldTicket = await Ticket.findByPk(old_ticket_id);
		const newTicket = await Ticket.findByPk(new_ticket_id);

		if (
			oldTicket &&
			oldTicket.status === 'Vendida' &&
			newTicket &&
			newTicket.status === 'Disponible'
		) {
			oldTicket.status = 'Disponible';
			newTicket.status = 'Vendida';
			await oldTicket.save();
			await newTicket.save();
			const newTransaction = await Transaction.create({
				user_id,
				ticket_id: new_ticket_id,
				transaction_type: 'change',
			});
			res.status(201).json(newTransaction);
		} else {
			res.status(400).json({ error: 'Invalid ticket status for change' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error changing ticket' });
	}
};

module.exports = {
	getAllTransactions,
	createTransaction,
	cancelTransaction,
	changeTicket,
};
