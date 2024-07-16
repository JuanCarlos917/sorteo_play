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

import UserSelect from './transactions/UserSelect';
import TransactionTypeSelect from './transactions/TransactionTypeSelect';
import TicketSelect from './transactions/TicketSelect';
import PaymentMethodSelect from './transactions/PaymentMethodSelect';
import Message from './transactions/Message';

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
	const [oldTicketNumber, setOldTicketNumber] = useState('');
	const [oldTicketId, setOldTicketId] = useState('');
	const [newTicketId, setNewTicketId] = useState('');
	const [cancelTransactionId, setCancelTransactionId] = useState(null);
	const [paymentMethod, setPaymentMethod] = useState('');
	const [message, setMessage] = useState('');
	const [filteredTickets, setFilteredTickets] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		dispatch(fetchUsers());
		dispatch(fetchTickets());
		dispatch(fetchTransactions());
	}, [dispatch]);

	useEffect(() => {
		if (transactionType === 'change' && userId) {
			const userTransactions = transactions.filter(
				(transaction) =>
					transaction.user_id === userId &&
					transaction.transaction_type === 'purchase',
			);
			if (userTransactions.length > 0) {
				const lastTransaction =
					userTransactions[userTransactions.length - 1];
				const ticket = tickets.find(
					(ticket) => ticket.id === lastTransaction.ticket_id,
				);
				if (ticket) {
					setOldTicketNumber(ticket.number);
					setOldTicketId(ticket.id);
				}
			}
		} else if (transactionType === 'cancellation' && ticketId) {
			const transaction = transactions.find(
				(transaction) =>
					transaction.ticket_id === ticketId &&
					transaction.transaction_type === 'purchase',
			);
			if (transaction) {
				setCancelTransactionId(transaction.id);
				const ticket = tickets.find(
					(ticket) => ticket.id === transaction.ticket_id,
				);
				if (ticket) {
					setOldTicketNumber(ticket.number);
				}
			} else {
				setCancelTransactionId(null);
				setOldTicketNumber('');
			}
		} else {
			setCancelTransactionId(null);
			setOldTicketNumber('');
		}
	}, [transactionType, userId, transactions, tickets, ticketId]);

	useEffect(() => {
		if (userId) {
			const user = users.find((u) => u.id === userId);
			if (user) {
				const userTickets = tickets.filter(
					(ticket) =>
						ticket.status === 'Reservado' &&
						ticket.buyerName === user.name,
				);
				setFilteredTickets(userTickets);
			}
		}
	}, [userId, tickets, users]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (transactionType === 'purchase') {
				await dispatch(
					createTransaction({
						user_id: userId,
						ticket_id: ticketId,
						transaction_type: transactionType,
						paymentMethod,
					}),
				).unwrap();
			} else if (transactionType === 'cancellation') {
				if (cancelTransactionId) {
					await dispatch(
						cancelTransaction(cancelTransactionId),
					).unwrap();
				} else {
					alert('No purchase transaction found for this ticket.');
				}
			} else if (transactionType === 'change') {
				await dispatch(
					changeTicket({
						user_id: userId,
						old_ticket_id: oldTicketId,
						new_ticket_id: newTicketId,
					}),
				).unwrap();
			}
			setMessage('Transaction completed successfully.');
		} catch (error) {
			setMessage(`Error: ${error.message}`);
		}
		setIsLoading(false);
		setUserId('');
		setTicketId('');
		setTransactionType('purchase');
		setOldTicketNumber('');
		setOldTicketId('');
		setNewTicketId('');
		setPaymentMethod('');
	};

	return (
		<div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Create Transaction
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form className='space-y-6' onSubmit={handleSubmit}>
					<UserSelect
						users={users}
						userId={userId}
						setUserId={setUserId}
					/>
					<TransactionTypeSelect
						transactionType={transactionType}
						setTransactionType={setTransactionType}
					/>
					<TicketSelect
						tickets={tickets}
						ticketId={ticketId}
						setTicketId={setTicketId}
						transactionType={transactionType}
						transactions={transactions}
						cancelTransactionId={cancelTransactionId}
						oldTicketNumber={oldTicketNumber}
						newTicketId={newTicketId}
						setNewTicketId={setNewTicketId}
						filteredTickets={filteredTickets}
					/>
					<PaymentMethodSelect
						paymentMethod={paymentMethod}
						setPaymentMethod={setPaymentMethod}
					/>
					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							disabled={isLoading}>
							{isLoading ? 'Enviando...' : 'Submit'}
						</button>
					</div>
				</form>
				<Message message={message} />
			</div>
		</div>
	);
};

export default CreateTransaction;
