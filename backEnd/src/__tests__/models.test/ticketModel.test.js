const { Ticket } = require('../../index');
const { Sequelize } = require('sequelize');

describe('Ticket Model', () => {
	// Test para la creación de un Ticket
	it('should create a ticket with a valid number and default status', async () => {
		const ticket = await Ticket.create({ number: '001' });
		expect(ticket.number).toBe('001');
		expect(ticket.status).toBe('Disponible');
	});

	// Test para la validación de unicidad en el número de Ticket
	it('should not allow duplicate ticket numbers', async () => {
		await Ticket.create({ number: '001' });

		await expect(Ticket.create({ number: '001' })).rejects.toThrow(
			Sequelize.UniqueConstraintError,
		);
	});

	// Test para la actualización del estado de un Ticket
	it('should update the status of a ticket', async () => {
		const ticket = await Ticket.create({ number: '002' });

		ticket.status = 'Reservado';
		await ticket.save();

		expect(ticket.status).toBe('Reservado');
	});

	// Test para los campos opcionales buyerName, buyerContact, buyerEmail
	it('should allow setting buyer details', async () => {
		const ticket = await Ticket.create({
			number: '003',
			buyerName: 'John Doe',
			buyerContact: '123-456-7890',
			buyerEmail: 'john@example.com',
		});

		expect(ticket.buyerName).toBe('John Doe');
		expect(ticket.buyerContact).toBe('123-456-7890');
		expect(ticket.buyerEmail).toBe('john@example.com');
	});

	// Test para asegurarse de que el campo number es requerido
	it('should not allow creating a ticket without a number', async () => {
		await expect(Ticket.create({})).rejects.toThrow();
	});

	// Test para asegurarse de que el estado tiene un valor predeterminado
	it('should default status to "Disponible" if not provided', async () => {
		const ticket = await Ticket.create({ number: '004' });
		expect(ticket.status).toBe('Disponible');
	});
});
