const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	logoutUser,
	forgotPassword,
	resetPassword,
} = require('../controllers/adminController');
const {
	postAuthValidations,
	handleValidationErrors,
} = require('../utils/authValidations');

// Ruta para registrar un usuario
router.post(
	'/register',
	postAuthValidations,
	handleValidationErrors,
	registerUser,
);
// Ruta para iniciar sesión de un usuario
router.post('/login', postAuthValidations, handleValidationErrors, loginUser);
// Ruta para cerrar sesión de un usuario
router.get('/logout', logoutUser);
// Ruta para solicitar un token de reseteo de contraseña
router.post('/forgot-password', forgotPassword);
// Ruta para restablecer la contraseña
router.post('/reset-password/:verificationCode', resetPassword);

module.exports = router;
