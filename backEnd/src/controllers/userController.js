const { User } = require('../index');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching users' });
	}
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
	const { name, email, phone } = req.body;
	try {
		const newUser = await User.create({ name, email, phone });
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: 'Error creating user' });
	}
};

// Actualizar un usuario existente
const updateUser = async (req, res) => {
	const { id } = req.params;
	const { name, email, phone } = req.body;
	try {
		const user = await User.findByPk(id);
		if (user) {
			user.name = name;
			user.email = email;
			user.phone = phone;
			await user.save();
			res.status(200).json(user);
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error updating user' });
	}
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findByPk(id);
		if (user) {
			await user.destroy();
			res.status(200).json({ message: 'User deleted successfully' });
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Error deleting user' });
	}
};

module.exports = {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
};
