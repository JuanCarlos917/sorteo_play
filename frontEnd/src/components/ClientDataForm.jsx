// src/components/UserForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../features/users/userSlice';

const ClientDataForm = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createUser({ name, email, phone }));
		setName('');
		setEmail('');
		setPhone('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Name:</label>
				<input
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div>
				<label>Email:</label>
				<input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label>Phone:</label>
				<input
					type='text'
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
			</div>
			<button type='submit'>Add User</button>
		</form>
	);
};

export default ClientDataForm;
