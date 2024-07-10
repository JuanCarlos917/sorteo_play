import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../features/users/userSlice';
import { updateTicket } from '../features/tickets/ticketSlice';
import AvailableTickets from './AvailableTickets';

const UserForm = () => {
	const dispatch = useDispatch();
	const [selectedTicket, setSelectedTicket] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Create user
		const resultAction = await dispatch(createUser({ name, email, phone }));

		if (createUser.fulfilled.match(resultAction)) {
			// Update ticket
			dispatch(
				updateTicket({
					id: selectedTicket,
					ticket: {
						status: 'Vendida',
						buyerName: name,
						buyerContact: phone,
						buyerEmail: email,
					},
				}),
			);

			// Reset form fields
			setName('');
			setEmail('');
			setPhone('');
			setSelectedTicket('');
		}
	};

	const handleTicketChange = (e) => {
		setSelectedTicket(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Select Ticket</h2>
			<AvailableTickets
				onTicketChange={handleTicketChange}
				selectedTicket={selectedTicket}
			/>

			<h2>Client Information</h2>
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
			<button type='submit'>Submit</button>
		</form>
	);
};

export default UserForm;
