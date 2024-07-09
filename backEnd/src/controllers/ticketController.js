const { Ticket } = require('../index');

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
                return res.status(400).json({ error: 'Start value cannot be greater than end value' });
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
            return res.status(400).json({ error: 'Either start and end or number must be provided' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error creating tickets' });
    }
};

// Actualizar un boleto
const updateTicket = async (req, res) => {
	const { id } = req.params;
	const { buyerName, buyerContact, buyerEmail } = req.body;

	if (!buyerName || !buyerContact || !buyerEmail) {
		return res
			.status(400)
			.json({
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

// Change a ticket
const changeTicket = async (req, res) => {
	const { currentNumber, newNumber, buyerName, buyerContact, buyerEmail } = req.body;

	try {
		const currentTicket = await Ticket.findOne({ where: { number: currentNumber } });
		const newTicket = await Ticket.findOne({ where: { number: newNumber } });

		if (!currentTicket || currentTicket.status !== 'Vendida') {
			return res.status(400).json({ error: 'Current ticket is not sold or does not exist' });
		}

		if (!newTicket || newTicket.status !== 'Disponible') {
			return res.status(400).json({ error: 'New ticket is not available or does not exist' });
		}

		if (
			currentTicket.buyerName !== buyerName ||
			currentTicket.buyerContact !== buyerContact ||
			currentTicket.buyerEmail !== buyerEmail
		) {
			return res.status(400).json({ error: 'Buyer details do not match' });
		}

		// Update the tickets
		await currentTicket.update({
			status: 'Disponible',
			buyerName: null,
			buyerContact: null,
			buyerEmail: null,
		});

		await newTicket.update({
			status: 'Vendida',
			buyerName,
			buyerContact,
			buyerEmail,
		});

		res.status(200).json({
			message: 'Ticket changed successfully',
			updatedCurrentTicket: currentTicket,
			updatedNewTicket: newTicket,
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
	createTickets,
	updateTicket,
	deleteTicket,
    changeTicket
};
