
export const validateName = (name) => {
	if (!name) return 'Nombre y apellido es obligatorio';
	return '';
};

export const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const allowedDomains = [
		'outlook.com',
		'gmail.com',
		'hotmail.com',
		'yahoo.com',
		'aol.com',
		'icloud.com',
		'live.com',
		'msn.com',
	];

	if (!email) return 'Correo electrónico es obligatorio';
	if (!emailRegex.test(email))
		return 'Formato de correo electrónico no válido';

	const domain = email.split('@')[1];
	if (!allowedDomains.includes(domain)) {
		return `Dominio de correo electrónico no permitido. Debe terminar en: ${allowedDomains.join(
			', ',
		)}`;
	}
	return '';
};

export const validatePhone = (phone) => {
	const phoneRegex = /^\d{10}$/;
	if (!phone) return 'Phone is required';
	if (!phoneRegex.test(phone)) return 'El teléfono debe tener 10 dígitos';
	return '';
};
