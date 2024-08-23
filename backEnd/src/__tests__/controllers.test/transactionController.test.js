const request = require('supertest');
const app = require('../../app');
const { Transaction, Ticket, User } = require('../../index');
const sequelize = require('../../db');

const { v4: uuidv4 } = require('uuid');
const fakeUUID = uuidv4();

jest.mock('../../services/emailServiceGmail', () => ({
	sendConfirmationEmail: jest.fn(),
	sendCancellationEmail: jest.fn(),
	sendChangeEmail: jest.fn(),
}));

const {
	sendConfirmationEmail,
	sendCancellationEmail,
	sendChangeEmail,
} = require('../../services/emailServiceGmail');

describe('Transaction Controller', () => {
	beforeAll(async () => {
		if (
			process.env.NODE_ENV === 'test' ||
			process.env.NODE_ENV === 'development'
		) {
			await sequelize.sync({ force: true });
		}
	});

	afterEach(async () => {
		await Ticket.destroy({ where: {} }); // Limpia los Tickets después de cada prueba
		await Transaction.destroy({ where: {} }); // Limpia las Transacciones después de cada prueba
		await User.destroy({ where: {} }); // Limpia los Usuarios después de cada prueba
	});

	describe('GET /api/transactions', () => {
		it('should fetch all transactions', async () => {
			const res = await request(app).get('/api/transactions');
			expect(res.statusCode).toEqual(200);
			expect(Array.isArray(res.body)).toBe(true);
		});
	});

describe('POST /api/transactions', () => {
	it('should create a transaction successfully', async () => {
		const ticket = await Ticket.create({
			id: uuidv4(),
			number: '001',
			status: 'Reservado',
		});
		const user = await User.create({
			id: uuidv4(),
			name: 'John Doe',
			email: 'john@example.com',
			phone: '123-456-7890',
		});

		const res = await request(app).post('/api/transactions').send({
			user_id: user.id,
			ticket_id: ticket.id,
			transaction_type: 'purchase',
			paymentMethod: 'Nequi',
		});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('id');
		await ticket.reload();
		expect(ticket.status).toEqual('Vendida');

		// Verificar que se llama a sendConfirmationEmail con el nombre del usuario
		expect(sendConfirmationEmail).toHaveBeenCalledWith(
			user.email,
			ticket.number,
			'Nequi',
			user.name,
		);
	});

	it('should return 400 if ticket is not available for purchase', async () => {
		const res = await request(app).post('/api/transactions').send({
			user_id: 999, // usuario inexistente
			ticket_id: 999, // ticket inexistente
			transaction_type: 'purchase',
			paymentMethod: 'Nequi',
		});

		expect(res.statusCode).toEqual(400);
		expect(res.body.error).toBe(
			'Ticket not available for purchase or user not found',
		);
	});
});

	describe('POST /api/transactions/cancel/:id', () => {
		it('should cancel a transaction successfully', async () => {
			const ticket = await Ticket.create({
				id: uuidv4(),
				number: '001',
				status: 'Vendida',
			});
			const user = await User.create({
				name: 'John Doe',
				email: 'john@example.com',
				phone: '3132074757',
			});
			const transaction = await Transaction.create({
				id: uuidv4(),
				user_id: user.id,
				ticket_id: ticket.id,
				transaction_type: 'purchase',
				paymentMethod: 'Nequi',
			});

			const res = await request(app).post(
				`/api/transactions/cancel/${transaction.id}`,
			);

			// Volver a obtener el ticket actualizado
			const updatedTicket = await Ticket.findByPk(ticket.id);

			expect(res.statusCode).toEqual(201);
			expect(updatedTicket.status).toEqual('Disponible');

			// Verificar que se llamó a sendCancellationEmail con los argumentos correctos
			expect(sendCancellationEmail).toHaveBeenCalledWith(
				user.email,
				ticket.number,
                user.name,
			);
		});

		it('should return 404 if transaction is not found', async () => {
			const nonExistentTransactionId = uuidv4();
			const res = await request(app).post(
				`/api/transactions/cancel/${nonExistentTransactionId}`,
			);

			expect(res.statusCode).toEqual(404);
			expect(res.body.error).toBe('Purchase transaction not found');
		});
	});

	describe('POST /api/transactions/change', () => {
		it('should change the ticket successfully', async () => {
			const oldTicket = await Ticket.create({
				id: uuidv4(),
				number: '001',
				status: 'Vendida',
			});
			const newTicket = await Ticket.create({
				id: uuidv4(),
				number: '002',
				status: 'Disponible',
			});
			const user = await User.create({
				id: uuidv4(),
				name: 'John Doe',
				email: 'john@example.com',
				phone: '3132074757',
			});

			const res = await request(app)
				.post('/api/transactions/change')
				.send({
					old_ticket_id: oldTicket.id,
					new_ticket_id: newTicket.id,
					user_id: user.id,
				});

			// Recargar los tickets para asegurar que los cambios se han aplicado en la base de datos
			await oldTicket.reload();
			await newTicket.reload();

			expect(res.statusCode).toEqual(200);
			expect(oldTicket.status).toEqual('Disponible');
			expect(newTicket.status).toEqual('Vendida');

			// Verificar que se llamó a sendChangeEmail con los argumentos correctos
			expect(sendChangeEmail).toHaveBeenCalledWith(
				user.email,
				oldTicket.number,
				newTicket.number,
                user.name,
			);
		});

		it('should return 400 if old ticket is not sold', async () => {
			const res = await request(app)
				.post('/api/transactions/change')
				.send({
					old_ticket_id: 999,
					new_ticket_id: 999,
					user_id: 999,
				});

			expect(res.statusCode).toEqual(400);
			expect(res.body.error).toBe(
				'Old ticket is not sold or does not exist',
			);
		});
	});
});
