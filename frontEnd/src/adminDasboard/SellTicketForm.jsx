// src/components/SellTicketForm.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTicket } from '../features/tickets/ticketSlice';

const SellTicketForm = () => {
	const dispatch = useDispatch();
	const tickets = useSelector((state) => state.tickets.tickets);

	const [sellTicketNumber, setSellTicketNumber] = useState('');
	const [buyerName, setBuyerName] = useState('');
	const [buyerContact, setBuyerContact] = useState('');
	const [buyerEmail, setBuyerEmail] = useState('');
	const [sellError, setSellError] = useState('');

	const handleUpdate = (e) => {
		e.preventDefault();
		const ticketToSell = tickets.find(
			(ticket) => ticket.number === sellTicketNumber,
		);
		if (!ticketToSell) {
			setSellError('Ticket number not found');
			return;
		}
		if (ticketToSell.status !== 'Disponible') {
			setSellError('Ticket is already sold');
			return;
		}
		if (buyerName && buyerContact && buyerEmail) {
			dispatch(
				updateTicket({
					id: ticketToSell.id,
					ticket: {
						buyerName,
						buyerContact,
						buyerEmail,
						status: 'Vendida',
					},
				}),
			);
			setSellError('');
		} else {
			setSellError('Please fill in all buyer details to mark as sold');
		}
	};

	return (
		<div>
			<h2>Mark Ticket as Sold</h2>
			<form onSubmit={handleUpdate}>
				<div>
					<label>Ticket Number:</label>
					<input
						type='text'
						value={sellTicketNumber}
						onChange={(e) => setSellTicketNumber(e.target.value)}
					/>
				</div>
				<div>
					<label>Buyer Name:</label>
					<input
						type='text'
						value={buyerName}
						onChange={(e) => setBuyerName(e.target.value)}
					/>
				</div>
				<div>
					<label>Buyer Contact:</label>
					<input
						type='text'
						value={buyerContact}
						onChange={(e) => setBuyerContact(e.target.value)}
					/>
				</div>
				<div>
					<label>Buyer Email:</label>
					<input
						type='email'
						value={buyerEmail}
						onChange={(e) => setBuyerEmail(e.target.value)}
					/>
				</div>
				<button type='submit'>Mark as Sold</button>
				{sellError && <div style={{ color: 'red' }}>{sellError}</div>}
			</form>
		</div>
	);
};

export default SellTicketForm;
