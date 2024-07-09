// src/features/tickets/TicketForm.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTicket } from '../fetatures/tickets/ticketSlice';

const TicketForm = () => {
	const [number, setNumber] = useState('');
	const [buyerName, setBuyerName] = useState('');
	const [buyerContact, setBuyerContact] = useState('');
	const [buyerEmail, setBuyerEmail] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const newTicket = {
			number,
			buyerName,
			buyerContact,
			buyerEmail,
		};
		dispatch(createTicket(newTicket));
		setNumber('');
		setBuyerName('');
		setBuyerContact('');
		setBuyerEmail('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Ticket Number:</label>
				<input
					type='text'
					value={number}
					onChange={(e) => setNumber(e.target.value)}
					required
				/>
			</div>
			<div>
				<label>Buyer Name:</label>
				<input
					type='text'
					value={buyerName}
					onChange={(e) => setBuyerName(e.target.value)}
					required
				/>
			</div>
			<div>
				<label>Buyer Contact:</label>
				<input
					type='text'
					value={buyerContact}
					onChange={(e) => setBuyerContact(e.target.value)}
					required
				/>
			</div>
			<div>
				<label>Buyer Email:</label>
				<input
					type='email'
					value={buyerEmail}
					onChange={(e) => setBuyerEmail(e.target.value)}
					required
				/>
			</div>
			<button type='submit'>Add Ticket</button>
		</form>
	);
};

export default TicketForm;
