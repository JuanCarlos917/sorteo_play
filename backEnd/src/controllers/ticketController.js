const sequelize = require('../db');
const { Op } = require('sequelize');
const { Ticket, User } = require('../index');

const { v4: uuidv4 } = require('uuid');


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
				return res.status(400).json({
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
			return res.status(400).json({
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
		if (!uuidv4(ticket_id) || !uuidv4(user_id)) {
			return res.status(400).json({ error: 'Invalid UUID format' });
		}

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

// Función para buscar tickets
const searchTickets = async (req, res) => {
	const validStatuses = ['Disponible', 'Reservado', 'Vendida'];
	const { query } = req.query;

	try {
		const whereConditions = [
			sequelize.where(sequelize.cast(sequelize.col('id'), 'TEXT'), {
				[Op.iLike]: `%${query}%`,
			}),
			{ number: { [Op.iLike]: `%${query}%` } },
			{ buyerName: { [Op.iLike]: `%${query}%` } },
			{ buyerContact: { [Op.iLike]: `%${query}%` } },
			{ buyerEmail: { [Op.iLike]: `%${query}%` } },
		];

		// Si el query corresponde a un status válido, agrega la condición
		if (validStatuses.includes(query)) {
			whereConditions.push({ status: query });
		}

		const tickets = await Ticket.findAll({
			where: {
				[Op.or]: whereConditions,
			},
		});

		// Si no se encontraron tickets, devuelve un mensaje de "No tickets found"
		if (tickets.length === 0) {
			return res
				.status(200)
				.json({ message: 'No tickets found', tickets: [] });
		}

		res.status(200).json(tickets);
	} catch (error) {
		console.error('Error searching tickets:', error);
		res.status(500).json({ error: 'Error searching tickets' });
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
	searchTickets,
	deleteTicket,
};
