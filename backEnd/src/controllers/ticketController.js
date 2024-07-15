const { Ticket, User, Transaction } = require('../index');

// Obtener todos los boletos
const getAllTickets = async (req, res) => {
	try {
		const tickets = await Ticket.findAll();
		res.status(200).json(tickets);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching tickets' });
	}
};

// Crear boletos en un rango especificado o un boleto individual
const createTickets = async (req, res) => {
	const { start, end, number } = req.body;

	try {
		if (start !== undefined && end !== undefined) {
			// Crear boletos en el rango especificado
			if (start > end) {
				return res
					.status(400)
					.json({
						error: 'Start value cannot be greater than end value',
					});
			}

			const tickets = [];
			for (let i = start; i <= end; i++) {
				const ticketNumber = String(i).padStart(3, '0');
				tickets.push({ number: ticketNumber });
			}
			await Ticket.bulkCreate(tickets);
			res.status(201).json({ message: 'Tickets created successfully' });
		} else if (number !== undefined) {
			// Crear un boleto individual
			const ticketNumber = String(number).padStart(3, '0');
			await Ticket.create({ number: ticketNumber });
			res.status(201).json({ message: 'Ticket created successfully' });
		} else {
			return res
				.status(400)
				.json({
					error: 'Either start and end or number must be provided',
				});
		}
	} catch (error) {
		res.status(500).json({ error: 'Error creating tickets' });
	}
};

// Reservar un boleto
const reserveTicket = async (req, res) => {
	const { ticket_id, user_id } = req.body;
	try {
		const ticket = await Ticket.findByPk(ticket_id);
		const user = await User.findByPk(user_id);
		if (ticket && ticket.status === 'Disponible' && user) {
			ticket.status = 'Reservado';
			ticket.buyerName = user.name;
			ticket.buyerContact = user.phone;
			ticket.buyerEmail = user.email;
			await ticket.save();
			res.status(200).json(ticket);
		} else {
			res.status(400).json({
				error: 'Ticket not available or user not found',
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Error reserving ticket' });
	}
};

// Actualizar un boleto
const updateTicket = async (req, res) => {
	const { id } = req.params;
	const { buyerName, buyerContact, buyerEmail } = req.body;

	if (!buyerName || !buyerContact || !buyerEmail) {
		return res.status(400).json({
			error: 'All buyer details must be provided to mark as sold',
		});
	}

	try {
		const ticket = await Ticket.findByPk(id);
		if (ticket) {
			ticket.buyerName = buyerName;
			ticket.buyerContact = buyerContact;
			ticket.buyerEmail = buyerEmail;
			ticket.status = 'Vendida';
			await ticket.save();
			res.status(200).json(ticket);
		} else {
			res.status(404).json({ error: 'Ticket not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error updating ticket' });
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
            return res.status(400).json({ error: 'Old ticket is not sold or does not exist' });
        }

        if (!newTicket || newTicket.status !== 'Disponible') {
            return res.status(400).json({ error: 'New ticket is not available or does not exist' });
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
                transaction_type: 'purchase'
            }
        });

        if (transaction) {
            transaction.ticket_id = new_ticket_id;
            await transaction.save();
        }

        res.status(200).json({
            message: 'Ticket changed successfully',
            updatedOldTicket: oldTicket,
            updatedNewTicket: newTicket
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error changing ticket' });
    }
};

// Eliminar un boleto
const deleteTicket = async (req, res) => {
	const { id } = req.params;
	try {
		const ticket = await Ticket.findByPk(id);
		if (ticket) {
			await ticket.destroy();
			res.status(200).json({ message: 'Ticket deleted successfully' });
		} else {
			res.status(404).json({ error: 'Ticket not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error deleting ticket' });
	}
};

module.exports = {
	getAllTickets,
	reserveTicket,
	createTickets,
	updateTicket,
	deleteTicket,
	changeTicket,
};
