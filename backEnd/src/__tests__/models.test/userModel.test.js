const { User } = require('../../index');

describe('User Model', () => {
	it('should create a user with valid attributes', async () => {
		const user = await User.create({
			name: 'John Doe',
			email: 'john.doe@example.com',
			phone: '1234567890',
		});

		expect(user.id).toBeDefined(); // Verifica que se haya generado un UUID
		expect(user.name).toBe('John Doe');
		expect(user.email).toBe('john.doe@example.com');
		expect(user.phone).toBe('1234567890');
	});

	it('should not create a user without a name', async () => {
		try {
			await User.create({
				email: 'john.doe@example.com',
				phone: '1234567890',
			});
		} catch (error) {
			expect(error.name).toBe('SequelizeValidationError');
		}
	});

	it('should not create a user without an email', async () => {
		try {
			await User.create({
				name: 'John Doe',
				phone: '1234567890',
			});
		} catch (error) {
			expect(error.name).toBe('SequelizeValidationError');
		}
	});

	it('should not create a user without a phone', async () => {
		try {
			await User.create({
				name: 'John Doe',
				email: 'john.doe@example.com',
			});
		} catch (error) {
			expect(error.name).toBe('SequelizeValidationError');
		}
	});
});
