// controllers/transactionController.js
const { Transaction, Ticket, User } = require('../index');
const {sendConfirmationEmail} = require('../services/emailService')

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
	const { user_id, ticket_id, transaction_type, paymentMethod } = req.body;
	try {
		if (transaction_type === 'purchase') {
			const ticket = await Ticket.findByPk(ticket_id);
			const user = await User.findByPk(user_id);
			if (ticket && ticket.status !== 'Vendida' && user) {
				ticket.buyerName = user.name;
				ticket.buyerContact = user.phone;
				ticket.buyerEmail = user.email;
				ticket.status = 'Vendida'; // Asegúrate de marcar el ticket como vendido
				await ticket.save();

				const newTransaction = await Transaction.create({
					user_id,
					ticket_id,
					transaction_type,
					paymentMethod, // Almacena el método de pago
				});

				// Envía el correo electrónico de confirmación
				await sendConfirmationEmail(
					user.email,
					ticket.number,
					paymentMethod,
				);

				res.status(201).json(newTransaction);
			} else {
				res.status(400).json({
					error: 'Ticket not available for purchase or user not found',
				});
			}
		} else {
			res.status(400).json({
				error: 'Invalid transaction type for this endpoint',
			});
		}
	} catch (error) {
		console.error(error);
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
				ticket.buyerName = null;
				ticket.buyerContact = null;
				ticket.buyerEmail = null;
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

		if (!oldTicket) {
			return res.status(404).json({ error: 'Old ticket not found' });
		}
		if (!newTicket) {
			return res.status(404).json({ error: 'New ticket not found' });
		}
		if (oldTicket.status !== 'Vendida') {
			return res.status(400).json({ error: 'Old ticket is not sold' });
		}
		if (newTicket.status !== 'Disponible') {
			return res
				.status(400)
				.json({ error: 'New ticket is not available' });
		}

		// Transfer data from old ticket to new ticket
		newTicket.status = 'Vendida';
		newTicket.buyerName = oldTicket.buyerName;
		newTicket.buyerContact = oldTicket.buyerContact;
		newTicket.buyerEmail = oldTicket.buyerEmail;

		// Clear old ticket data
		oldTicket.status = 'Disponible';
		oldTicket.buyerName = null;
		oldTicket.buyerContact = null;
		oldTicket.buyerEmail = null;

		await oldTicket.save();
		await newTicket.save();

		const newTransaction = await Transaction.create({
			user_id,
			ticket_id: new_ticket_id,
			transaction_type: 'change',
		});
		res.status(201).json(newTransaction);
	} catch (error) {
		console.error('Error changing ticket:', error);
		res.status(500).json({ error: 'Error changing ticket' });
	}
};

module.exports = {
	getAllTransactions,
	createTransaction,
	cancelTransaction,
	changeTicket,
};
