const { Transaction } = require('../index');

// Obtener todas las transacciones
const getAllTransactions = async (req, res) => {
	try {
		const transactions = await Transaction.findAll();
		res.status(200).json(transactions);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching transactions' });
	}
};

// Crear una nueva transacción
const createTransaction = async (req, res) => {
	const { user_id, ticket_id, transaction_type } = req.body;
	try {
		const newTransaction = await Transaction.create({
			user_id,
			ticket_id,
			transaction_type,
		});
		res.status(201).json(newTransaction);
	} catch (error) {
		res.status(500).json({ error: 'Error creating transaction' });
	}
};

module.exports = {
	getAllTransactions,
	createTransaction,
};
