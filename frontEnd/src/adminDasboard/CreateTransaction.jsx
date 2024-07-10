// src/components/CreateTransaction.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/userSlice';
import { fetchTickets } from '../features/tickets/ticketSlice';
import {
	fetchTransactions,
	createTransaction,
	cancelTransaction,
	changeTicket,
} from '../features/transactions/transactionSlice';

const CreateTransaction = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.users);
	const tickets = useSelector((state) => state.tickets.tickets);
	const transactions = useSelector(
		(state) => state.transactions.transactions,
	);

	const [userId, setUserId] = useState('');
	const [ticketId, setTicketId] = useState('');
	const [transactionType, setTransactionType] = useState('purchase');
	const [oldTicketId, setOldTicketId] = useState('');
	const [newTicketId, setNewTicketId] = useState('');

	useEffect(() => {
		dispatch(fetchUsers());
		dispatch(fetchTickets());
		dispatch(fetchTransactions());
	}, [dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (transactionType === 'purchase') {
			dispatch(
				createTransaction({
					user_id: userId,
					ticket_id: ticketId,
					transaction_type: transactionType,
				}),
			);
		} else if (transactionType === 'cancellation') {
			const transaction = transactions.find(
				(transaction) =>
					transaction.ticket_id === ticketId &&
					transaction.transaction_type === 'purchase',
			);
			if (transaction) {
				dispatch(cancelTransaction(transaction.id));
			} else {
				alert('No purchase transaction found for this ticket.');
			}
		} else if (transactionType === 'change') {
			dispatch(
				changeTicket({
					user_id: userId,
					old_ticket_id: oldTicketId,
					new_ticket_id: newTicketId,
				}),
			);
		}
		setUserId('');
		setTicketId('');
		setTransactionType('purchase');
		setOldTicketId('');
		setNewTicketId('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Create Transaction</h2>
			<div>
				<label>User ID:</label>
				<select
					value={userId}
					onChange={(e) => setUserId(e.target.value)}>
					<option value=''>Select User</option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.name} - {user.email} - {user.phone}
						</option>
					))}
				</select>
			</div>
			<div>
				<label>Transaction Type:</label>
				<select
					value={transactionType}
					onChange={(e) => setTransactionType(e.target.value)}>
					<option value='purchase'>Purchase</option>
					<option value='cancellation'>Cancellation</option>
					<option value='change'>Change</option>
				</select>
			</div>
			{transactionType === 'purchase' && (
				<div>
					<label>Ticket ID:</label>
					<select
						value={ticketId}
						onChange={(e) => setTicketId(e.target.value)}>
						<option value=''>Select Ticket</option>
						{tickets
							.filter((ticket) => ticket.status === 'Vendida')
							.map((ticket) => (
								<option key={ticket.id} value={ticket.id}>
									{ticket.number}
								</option>
							))}
					</select>
				</div>
			)}
			{transactionType === 'cancellation' && (
				<div>
					<label>Ticket ID:</label>
					<select
						value={ticketId}
						onChange={(e) => setTicketId(e.target.value)}>
						<option value=''>Select Ticket</option>
						{transactions
							.filter(
								(transaction) =>
									transaction.transaction_type === 'purchase',
							)
							.map((transaction) => (
								<option
									key={transaction.id}
									value={transaction.ticket_id}>
									{transaction.ticket_id}
								</option>
							))}
					</select>
				</div>
			)}
			{transactionType === 'change' && (
				<>
					<div>
						<label>Old Ticket ID:</label>
						<select
							value={oldTicketId}
							onChange={(e) => setOldTicketId(e.target.value)}>
							<option value=''>Select Old Ticket</option>
							{tickets
								.filter((ticket) => ticket.status === 'Vendida')
								.map((ticket) => (
									<option key={ticket.id} value={ticket.id}>
										{ticket.number}
									</option>
								))}
						</select>
					</div>
					<div>
						<label>New Ticket ID:</label>
						<select
							value={newTicketId}
							onChange={(e) => setNewTicketId(e.target.value)}>
							<option value=''>Select New Ticket</option>
							{tickets
								.filter(
									(ticket) => ticket.status === 'Disponible',
								)
								.map((ticket) => (
									<option key={ticket.id} value={ticket.id}>
										{ticket.number}
									</option>
								))}
						</select>
					</div>
				</>
			)}
			<button type='submit'>Submit</button>
		</form>
	);
};

export default CreateTransaction;
