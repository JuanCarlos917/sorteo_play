const { Transaction, User, Ticket } = require('../../index'); // Importa los modelos necesarios
const { v4: uuidv4 } = require('uuid');

describe('Transaction Model', () => {
	it('should create a transaction with valid attributes', async () => {
		const user = await User.create({
			id: uuidv4(),
			name: 'John Doe',
			email: 'john.doe@example.com',
			phone: '1234567890',
		});
		const ticket = await Ticket.create({ id: uuidv4(), number: '12345' });

		const transaction = await Transaction.create({
			user_id: user.id,
			ticket_id: ticket.id,
			transaction_type: 'purchase',
			paymentMethod: 'Nequi',
		});

		expect(transaction.id).toBeDefined(); // Verifica que se haya generado un UUID
		expect(transaction.user_id).toBe(user.id);
		expect(transaction.ticket_id).toBe(ticket.id);
		expect(transaction.transaction_type).toBe('purchase');
		expect(transaction.paymentMethod).toBe('Nequi');
	});

	it('should not create a transaction without user_id', async () => {
		const ticket = await Ticket.create({ id: uuidv4(), number: '12345' });

		try {
			await Transaction.create({
				ticket_id: ticket.id,
				transaction_type: 'purchase',
				paymentMethod: 'Nequi',
			});
		} catch (error) {
			expect(error.name).toBe('SequelizeValidationError');
		}
	});

	it('should not create a transaction without ticket_id', async () => {
		const user = await User.create({
			id: uuidv4(),
			name: 'John Doe',
			email: 'john.doe@example.com',
			phone: '1234567890',
		});

		try {
			await Transaction.create({
				user_id: user.id,
				transaction_type: 'purchase',
				paymentMethod: 'Nequi',
			});
		} catch (error) {
			expect(error.name).toBe('SequelizeValidationError');
		}
	});

	it('should not create a transaction without transaction_type', async () => {
		const user = await User.create({
			id: uuidv4(),
			name: 'John Doe',
			email: 'john.doe@example.com',
			phone: '1234567890',
		});
		const ticket = await Ticket.create({ id: uuidv4(), number: '12345' });

		try {
			await Transaction.create({
				user_id: user.id,
				ticket_id: ticket.id,
				paymentMethod: 'Nequi',
			});
		} catch (error) {
			expect(error.name).toBe('SequelizeValidationError');
		}
	});

	it('should not create a transaction with an invalid transaction_type', async () => {
		const user = await User.create({
			id: uuidv4(),
			name: 'John Doe',
			email: 'john.doe@example.com',
			phone: '1234567890',
		});
		const ticket = await Ticket.create({ id: uuidv4(), number: '12345' });

		try {
			await Transaction.create({
				user_id: user.id,
				ticket_id: ticket.id,
				transaction_type: 'invalid_type', // Tipo inválido
				paymentMethod: 'Nequi',
			});
		} catch (error) {
			expect([
				'SequelizeValidationError',
				'SequelizeDatabaseError',
			]).toContain(error.name);
		}
	});

	it('should not create a transaction without paymentMethod', async () => {
		const user = await User.create({
			id: uuidv4(),
			name: 'John Doe',
			email: 'john.doe@example.com',
			phone: '1234567890',
		});
		const ticket = await Ticket.create({ id: uuidv4(), number: '12345' });

		try {
			await Transaction.create({
				user_id: user.id,
				ticket_id: ticket.id,
				transaction_type: 'purchase',
			});
		} catch (error) {
			expect(error.name).toBe('SequelizeValidationError');
		}
	});
});
