const request = require('supertest');
const app = require('../../app');
const { Ticket, User } = require('../../index');
const sequelize = require('../../db');
const { v4: uuidv4 } = require('uuid');

describe('Ticket Controller', () => {
	beforeAll(async () => {
		if (
			process.env.NODE_ENV === 'test' ||
			process.env.NODE_ENV === 'development'
		) {
			await sequelize.sync({ force: true });
		}
	});

	afterAll(async () => {
		await sequelize.close(); // Cierra la conexión de la base de datos después de las pruebas
	});

	describe('GET /api/tickets', () => {
		it('should fetch all tickets', async () => {
			const res = await request(app).get('/api/tickets');
			expect(res.statusCode).toEqual(200);
			expect(Array.isArray(res.body)).toBe(true);
		});
	});

	describe('POST /api/tickets', () => {
		it('should create a ticket successfully', async () => {
			const res = await request(app)
				.post('/api/tickets')
				.send({ number: 123 });
			expect(res.statusCode).toEqual(201);
			expect(res.body.message).toBe('Ticket created successfully');
		});

		it('should return 400 if no number or range is provided', async () => {
			const res = await request(app).post('/api/tickets').send({});
			expect(res.statusCode).toEqual(400);
			expect(res.body.error).toBe(
				'Either start and end or number must be provided',
			);
		});
	});

	describe('POST /api/tickets/reserve', () => {
		it('should reserve a ticket successfully', async () => {
			const user = await User.create({
				name: 'Juan Carlos Gomez',
				phone: '123456789',
				email: 'johndoe@example.com',
			});
			const ticket = await Ticket.create({
				number: '001',
				status: 'Disponible',
			});

			const res = await request(app)
				.post('/api/tickets/reserve')
				.send({ ticket_id: ticket.id, user_id: user.id });

			expect(res.statusCode).toEqual(200);
			expect(res.body.status).toBe('Reservado');
			expect(res.body.buyerName).toBe('Juan Carlos Gomez');
		});

		const nonExistentTicketId = uuidv4(); // Genera un UUID que no existirá en la base de datos
		const nonExistentUserId = uuidv4(); // Genera un UUID que no existirá en la base de datos

		it('should return 400 if ticket is not available or user not found', async () => {
			const res = await request(app).post('/api/tickets/reserve').send({
				ticket_id: nonExistentTicketId,
				user_id: nonExistentUserId,
			});
			expect(res.statusCode).toEqual(400);
			expect(res.body.error).toBe(
				'Ticket not available or user not found',
			);
		});

		it('should return 404 if ticket not found', async () => {
			const res = await request(app).delete(
				`/api/tickets/${nonExistentTicketId}`,
			);
			expect(res.statusCode).toEqual(404);
			expect(res.body.error).toBe('Ticket not found');
		});
	});

	describe('GET /api/tickets/search', () => {
		it('should return matching tickets based on search query', async () => {
			const res = await request(app).get('/api/tickets/search?query=001');
			expect(res.statusCode).toEqual(200);
			expect(res.body.length).toBeGreaterThan(0);
		});

		it('should return no tickets found if no match', async () => {
			const res = await request(app).get(
				'/api/tickets/search?query=notfound',
			);
			expect(res.statusCode).toEqual(200);
			expect(res.body.message).toBe('No tickets found');
			expect(res.body.tickets).toEqual([]);
		});
	});

	describe('DELETE /api/tickets/:id', () => {
		it('should delete a ticket successfully', async () => {
			const ticket = await Ticket.create({
				number: '002',
				status: 'Disponible',
			});

			const res = await request(app).delete(`/api/tickets/${ticket.id}`);
			expect(res.statusCode).toEqual(200);
			expect(res.body.message).toBe('Ticket deleted successfully');
		});

		it('should return 404 if ticket not found', async () => {
			const nonExistentId = uuidv4();
			const res = await request(app).delete(
				`/api/tickets/${nonExistentId}`,
			);
			expect(res.statusCode).toEqual(404);
			expect(res.body.error).toBe('Ticket not found');
		});
	});
});
