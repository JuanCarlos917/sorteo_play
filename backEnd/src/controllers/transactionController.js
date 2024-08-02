// controllers/transactionController.js
const { Transaction, Ticket, User } = require('../index');
// const {
// 	sendConfirmationEmail,
// 	sendCancellationEmail,
// 	sendChangeEmail,
// } = require('../services/emailServiceOutlook');

const {
	sendConfirmationEmail,
	sendCancellationEmail,
	sendChangeEmail,
} = require('../services/emailServiceGmail');

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

			if (ticket && ticket.status === 'Reservado' && user) {
				ticket.status = 'Vendida';
				await ticket.save();

				const newTransaction = await Transaction.create({
					user_id,
					ticket_id,
					transaction_type,
					paymentMethod,
				});

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
		if (!transaction) {
			return res
				.status(404)
				.json({ error: 'Purchase transaction not found' });
		}

		if (transaction.transaction_type !== 'purchase') {
			return res
				.status(404)
				.json({ error: 'Purchase transaction not found' });
		}

		const ticket = await Ticket.findByPk(transaction.ticket_id);
		if (!ticket) {
			return res.status(404).json({ error: 'Ticket not found' });
		}

		const user = await User.findByPk(transaction.user_id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Update the ticket
		ticket.status = 'Disponible';
		ticket.buyerName = null;
		ticket.buyerContact = null;
		ticket.buyerEmail = null;
		await ticket.save();

		// Create a new cancellation transaction
		const newTransaction = await Transaction.create({
			user_id: transaction.user_id,
			ticket_id: transaction.ticket_id,
			transaction_type: 'cancellation',
			paymentMethod: transaction.paymentMethod,
		});

		// Send cancellation email
		await sendCancellationEmail(user.email, ticket.number);

		res.status(201).json(newTransaction);
	} catch (error) {
		console.error('Error in cancelTransaction:', error);
		res.status(500).json({ error: 'Error canceling transaction' });
	}
};

// Controlador para cambiar una boleta
const changeTicket = async (req, res) => {
	const { old_ticket_id, new_ticket_id, user_id } = req.body;

	try {
		// Encontrar las boletas y el usuario
		const oldTicket = await Ticket.findByPk(old_ticket_id);
		const newTicket = await Ticket.findByPk(new_ticket_id);
		const user = await User.findByPk(user_id);

		if (!oldTicket || oldTicket.status !== 'Vendida') {
			return res
				.status(400)
				.json({ error: 'Old ticket is not sold or does not exist' });
		}

		if (!newTicket || newTicket.status !== 'Disponible') {
			return res.status(400).json({
				error: 'New ticket is not available or does not exist',
			});
		}

		if (!user) {
			return res.status(400).json({ error: 'User not found' });
		}

		// Actualizar la antigua boleta
		oldTicket.status = 'Disponible';
		oldTicket.buyerName = null;
		oldTicket.buyerContact = null;
		oldTicket.buyerEmail = null;
		await oldTicket.save();

		// Actualizar la nueva boleta
		newTicket.status = 'Vendida';
		newTicket.buyerName = user.name;
		newTicket.buyerContact = user.phone;
		newTicket.buyerEmail = user.email;
		await newTicket.save();

		// Actualizar la transacción
		const transaction = await Transaction.findOne({
			where: {
				user_id: user_id,
				ticket_id: old_ticket_id,
				transaction_type: 'purchase',
			},
		});

		if (transaction) {
			transaction.ticket_id = new_ticket_id;
			await transaction.save();
		}

		await sendChangeEmail(user.email, oldTicket.number, newTicket.number);

		res.status(200).json({
			message: 'Ticket changed successfully',
			updatedOldTicket: oldTicket,
			updatedNewTicket: newTicket,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error changing ticket' });
	}
};

module.exports = {
	getAllTransactions,
	createTransaction,
	cancelTransaction,
	changeTicket,
};
