import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeTicket } from '../features/tickets/ticketSlice';

const ChangeTicketForm = () => {
	const dispatch = useDispatch();
	const [currentNumber, setCurrentNumber] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [buyerName, setBuyerName] = useState('');
	const [buyerContact, setBuyerContact] = useState('');
	const [buyerEmail, setBuyerEmail] = useState('');
	const [changeError, setChangeError] = useState('');

	const handleChange = (e) => {
		e.preventDefault();
		dispatch(
			changeTicket({
				currentNumber,
				newNumber,
				buyerName,
				buyerContact,
				buyerEmail,
			}),
		).then((response) => {
			if (response.error) {
				setChangeError(response.error.message);
			} else {
				setChangeError('');
			}
		});
	};

	return (
		<div>
			<h2>Change Ticket</h2>
			<form onSubmit={handleChange}>
				<div>
					<label>Current Ticket Number:</label>
					<input
						type='text'
						value={currentNumber}
						onChange={(e) => setCurrentNumber(e.target.value)}
					/>
				</div>
				<div>
					<label>New Ticket Number:</label>
					<input
						type='text'
						value={newNumber}
						onChange={(e) => setNewNumber(e.target.value)}
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
				<button type='submit'>Change Ticket</button>
				{changeError && (
					<div style={{ color: 'red' }}>{changeError}</div>
				)}
			</form>
		</div>
	);
};

export default ChangeTicketForm;
