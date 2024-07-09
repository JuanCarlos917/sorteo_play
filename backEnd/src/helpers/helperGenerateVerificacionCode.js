const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateVerificationCode = () => {
	return crypto.randomBytes(4).toString('hex'); // Generará un código de 8 caracteres alfanuméricos
};

const generateVerificationToken = () => {
	const code = generateVerificationCode();

	const token = jwt.sign({ verificationCode: code }, process.env.JWT_SECRET, {
		expiresIn: '1h',
	});

	// Codifica el JWT en Base64 para eliminar los puntos.
	const base64Token = Buffer.from(token).toString('base64');
	return base64Token;
};

module.exports = { generateVerificationToken };
