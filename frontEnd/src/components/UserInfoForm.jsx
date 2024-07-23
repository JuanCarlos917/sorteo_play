import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const UserInfoForm = ({
	name,
	setName,
	email,
	setEmail,
	phone,
	setPhone,
	error,
}) => {
	return (
		<>
			<TextField
				label='Nombre y Apellido'
				value={name}
				onChange={(e) => setName(e.target.value)}
				fullWidth
				margin='normal'
				error={!!error.name}
				helperText={error.name}
				required
				sx={{
					input: { color: '#263238' },
					'& .MuiInputLabel-root.Mui-focused': {
						color: '#263238',
					},
					label: { color: '#616161' },
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: '#e0e0e0',
						},
						'&:hover fieldset': {
							borderColor: '#0074ff',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#0074ff',
						},
					},
				}}
			/>
			<TextField
				label='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				fullWidth
				margin='normal'
				error={!!error.email}
				helperText={error.email}
				required
				sx={{
					input: { color: '#263238' },
					'& .MuiInputLabel-root.Mui-focused': {
						color: '#263238',
					},
					label: { color: '#616161' },
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: '#e0e0e0',
						},
						'&:hover fieldset': {
							borderColor: '#0074ff',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#0074ff',
						},
					},
				}}
			/>
			<TextField
				label='Celular'
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				fullWidth
				margin='normal'
				error={!!error.phone}
				helperText={error.phone}
				required
				sx={{
					input: { color: '#263238' },
					'& .MuiInputLabel-root.Mui-focused': {
						color: '#263238',
					},
					label: { color: '#616161' },
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: '#e0e0e0',
						},
						'&:hover fieldset': {
							borderColor: '#0074ff',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#0074ff',
						},
					},
				}}
			/>
		</>
	);
};

UserInfoForm.propTypes = {
	name: PropTypes.string.isRequired,
	setName: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired,
	setEmail: PropTypes.func.isRequired,
	phone: PropTypes.string.isRequired,
	setPhone: PropTypes.func.isRequired,
	error: PropTypes.shape({
		name: PropTypes.string,
		email: PropTypes.string,
		phone: PropTypes.string,
	}),
};

export default UserInfoForm;
