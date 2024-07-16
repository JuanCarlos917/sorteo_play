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
					<div>
						<label
							htmlFor='userId'
							className='block text-sm font-medium leading-6 text-gray-900'>
							User Name
						</label>
						<div className='mt-2'>
							<select
								id='userId'
								name='userId'
								value={userId}
								onChange={(e) => setUserId(e.target.value)}
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
								<option value=''>Select User</option>
								{users.map((user) => (
									<option key={user.id} value={user.id}>
										{user.name} - {user.email} -{' '}
										{user.phone}
									</option>
								))}
							</select>
						</div>
					</div>

					<div>
						<label
							htmlFor='transactionType'
							className='block text-sm font-medium leading-6 text-gray-900'>
							Transaction Type
						</label>
						<div className='mt-2'>
							<select
								id='transactionType'
								name='transactionType'
								value={transactionType}
								onChange={(e) =>
									setTransactionType(e.target.value)
								}
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
								<option value='purchase'>Purchase</option>
								<option value='cancellation'>
									Cancellation
								</option>
								<option value='change'>Change</option>
							</select>
						</div>
					</div>

					{transactionType === 'purchase' && (
						<div>
							<label
								htmlFor='ticketId'
								className='block text-sm font-medium leading-6 text-gray-900'>
								Ticket ID
							</label>
							<div className='mt-2'>
								<select
									id='ticketId'
									name='ticketId'
									value={ticketId}
									onChange={(e) =>
										setTicketId(e.target.value)
									}
									required
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
									<option value=''>Select Ticket</option>
									{tickets
										.filter(
											(ticket) =>
												ticket.status === 'Reservado',
										)
										.map((ticket) => (
											<option
												key={ticket.id}
												value={ticket.id}>
												{ticket.number}
											</option>
										))}
								</select>
							</div>
							<div>
								<label
									htmlFor='paymentMethod'
									className='block text-sm font-medium leading-6 text-gray-900'>
									Payment Method:
								</label>
								<div className='mt-2'>
									<select
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										value={paymentMethod}
										onChange={(e) =>
											setPaymentMethod(e.target.value)
										}>
										<option value=''>
											Select Payment Method
										</option>
										<option value='Nequi'>Nequi</option>
										<option value='DaviPlata'>
											DaviPlata
										</option>
										<option value='Bancolombia'>
											Bancolombia
										</option>
									</select>
								</div>
							</div>
						</div>
					)}

					{transactionType === 'cancellation' && (
						<div>
							<label
								htmlFor='ticketId'
								className='block text-sm font-medium leading-6 text-gray-900'>
								Ticket ID
							</label>
							<div className='mt-2'>
								<select
									id='ticketId'
									name='ticketId'
									value={ticketId}
									onChange={(e) =>
										setTicketId(e.target.value)
									}
									required
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
									<option value=''>Select Ticket</option>
									{transactions
										.filter(
											(transaction) =>
												transaction.transaction_type ===
												'purchase',
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
							{cancelTransactionId && (
								<div>
									<label
										htmlFor='oldTicketNumber'
										className='block text-sm font-medium leading-6 text-gray-900'>
										Ticket Number
									</label>
									<input
										id='oldTicketNumber'
										type='text'
										value={oldTicketNumber}
										disabled
										className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							)}
						</div>
					)}

					{transactionType === 'change' && (
						<>
							<div>
								<label
									htmlFor='oldTicketNumber'
									className='block text-sm font-medium leading-6 text-gray-900'>
									Old Ticket Number
								</label>
								<input
									id='oldTicketNumber'
									type='text'
									value={oldTicketNumber}
									disabled
									className='mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
							</div>
							<div>
								<label
									htmlFor='newTicketId'
									className='block text-sm font-medium leading-6 text-gray-900'>
									New Ticket ID
								</label>
								<div className='mt-2'>
									<select
										id='newTicketId'
										name='newTicketId'
										value={newTicketId}
										onChange={(e) =>
											setNewTicketId(e.target.value)
										}
										required
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
										<option value=''>
											Select New Ticket
										</option>
										{tickets
											.filter(
												(ticket) =>
													ticket.status ===
													'Disponible',
											)
											.map((ticket) => (
												<option
													key={ticket.id}
													value={ticket.id}>
													{ticket.number}
												</option>
											))}
									</select>
								</div>
							</div>
						</>
					)}

					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							disabled={isLoading}>
							{isLoading ? 'Enviando...' : 'Submit'}
						</button>
					</div>
				</form>

				{message && (
					<div className='text-center mt-4 text-green-600'>
						{message}
					</div>
				)}
			</div>
		</div>
	);
};

export default CreateTransaction;
