const request = require('supertest');
const app = require('../../app');
const { User } = require('../../index');
jest.mock('../../index', () => ({
	User: {
		create: jest.fn(),
		findAll: jest.fn(),
		findByPk: jest.fn(),
		destroy: jest.fn(),
	},
}));

describe('Users Controller', () => {
	describe('GET /api/users', () => {
		it('should return an empty array when there are no users', async () => {
			User.findAll.mockResolvedValue([]);
			const res = await request(app).get('/api/users');
			expect(res.statusCode).toBe(200);
			expect(Array.isArray(res.body)).toBe(true);
		});

		it('should return a list of users', async () => {
			User.findAll.mockResolvedValue([
				{
					id: 1,
					name: 'John Doe',
					email: 'john.doe@example.com',
					phone: '1234567890',
				},
			]);

			const res = await request(app).get('/api/users');
			expect(res.statusCode).toBe(200);
			expect(res.body.length).toBe(1);
			expect(res.body[0].name).toBe('John Doe');
		});
	});

	describe('POST /api/users', () => {
		it('should create a new user', async () => {
			User.create.mockResolvedValue({
				id: 1,
				name: 'Jane Doe',
				email: 'jane.doe@example.com',
				phone: '0987654321',
			});

			const res = await request(app).post('/api/users').send({
				name: 'Jane Doe',
				email: 'jane.doe@example.com',
				phone: '0987654321',
			});
			expect(res.statusCode).toBe(201);
			expect(res.body.name).toBe('Jane Doe');
			expect(res.body.email).toBe('jane.doe@example.com');
			expect(res.body.phone).toBe('0987654321');
		});

		it('should return an error if the name is missing', async () => {
			const res = await request(app).post('/api/users').send({
				email: 'jane.doe@example.com',
				phone: '0987654321',
			});
			expect(res.statusCode).toBe(400);
			expect(res.body.error).toBe('Name, email, and phone are required');
		});

		it('should return an error if the email is missing', async () => {
			const res = await request(app).post('/api/users').send({
				name: 'Jane Doe',
				phone: '0987654321',
			});
			expect(res.statusCode).toBe(400);
			expect(res.body.error).toBe('Name, email, and phone are required');
		});

		it('should return an error if the phone is missing', async () => {
			const res = await request(app).post('/api/users').send({
				name: 'Jane Doe',
				email: 'jane.doe@example.com',
			});
			expect(res.statusCode).toBe(400);
			expect(res.body.error).toBe('Name, email, and phone are required');
		});
	});

	describe('PUT /api/users/:id', () => {
		it('should update an existing user', async () => {
			User.findByPk.mockResolvedValue({
				id: 1,
				name: 'John Smith',
				email: 'john.smith@example.com',
				phone: '1231231234',
				save: jest.fn().mockResolvedValue(),
			});

			const res = await request(app).put('/api/users/1').send({
				name: 'John Smith Updated',
				email: 'john.smith.updated@example.com',
				phone: '9876543210',
			});
			expect(res.statusCode).toBe(200);
			expect(res.body.name).toBe('John Smith Updated');
		});

		it('should return 404 if the user does not exist', async () => {
			User.findByPk.mockResolvedValue(null);

			const res = await request(app).put('/api/users/999').send({
				name: 'Non Existent User',
				email: 'non.existent@example.com',
				phone: '0000000000',
			});
			expect(res.statusCode).toBe(404);
		});
	});

	describe('DELETE /api/users/:id', () => {
		it('should delete an existing user', async () => {
			User.findByPk.mockResolvedValue({
				id: 1,
				name: 'User To Delete',
				email: 'delete.me@example.com',
				phone: '1111111111',
				destroy: jest.fn().mockResolvedValue(),
			});

			const res = await request(app).delete('/api/users/1');
			expect(res.statusCode).toBe(200);
			expect(res.body.message).toBe('User deleted successfully');
		});

		it('should return 404 if the user does not exist', async () => {
			User.findByPk.mockResolvedValue(null);

			const res = await request(app).delete('/api/users/999');
			expect(res.statusCode).toBe(404);
		});
	});
});
