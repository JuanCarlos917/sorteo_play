
export const validateName = (name) => {
	if (!name) return 'Name is required';
	return '';
};

export const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email) return 'Email is required';
	if (!emailRegex.test(email)) return 'Invalid email format';
	return '';
};

export const validatePhone = (phone) => {
	const phoneRegex = /^\d{10}$/;
	if (!phone) return 'Phone is required';
	if (!phoneRegex.test(phone)) return 'Phone must be 10 digits';
	return '';
};
