const { body, validationResult } = require('express-validator');

const postAuthValidations = [
	body('email').isEmail().withMessage('El campo email es obligatorio'),
	body('password')
		.isLength({ min: 8 })
		.withMessage(
			'El campo password es obligatorio y debe tener 8 caracteres ',
		),
];
// Función para manejar los errores de validación
const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

module.exports = {
	postAuthValidations,
	handleValidationErrors,
};
