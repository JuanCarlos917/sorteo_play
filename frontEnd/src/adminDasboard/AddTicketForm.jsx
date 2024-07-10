// src/components/AddTicketForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTicket } from '../features/tickets/ticketSlice';

const AddTicketForm = () => {
	const dispatch = useDispatch();
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [number, setNumber] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (start && end) {
			dispatch(
				createTicket({
					start: parseInt(start, 10),
					end: parseInt(end, 10),
				}),
			);
		} else if (number) {
			dispatch(createTicket({ number: parseInt(number, 10) }));
		}
		setStart('');
		setEnd('');
		setNumber('');
	};

	return (
		<form onSubmit={handleSubmit}>
            <h2>Tickets</h2>
			<div>
				<label>Start Number:</label>
				<input
					type='number'
					value={start}
					onChange={(e) => setStart(e.target.value)}
				/>
			</div>
			<div>
				<label>End Number:</label>
				<input
					type='number'
					value={end}
					onChange={(e) => setEnd(e.target.value)}
				/>
			</div>
			<div>
				<label>Single Ticket Number:</label>
				<input
					type='number'
					value={number}
					onChange={(e) => setNumber(e.target.value)}
				/>
			</div>
			<button type='submit'>Add Ticket</button>
		</form>
	);
};

export default AddTicketForm;
