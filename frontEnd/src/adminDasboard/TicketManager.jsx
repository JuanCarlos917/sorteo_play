import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, deleteTicket } from '../features/tickets/ticketSlice';
import AddTicketForm from './AddTicketForm';
import UserList from './UserList';
import CreateTransaction from './CreateTransaction';
import TransactionList from './TransactionList';

const TicketManager = () => {
	const dispatch = useDispatch();
	const tickets = useSelector((state) => state.tickets.tickets);
	const status = useSelector((state) => state.tickets.status);
	const error = useSelector((state) => state.tickets.error);

	useEffect(() => {
		dispatch(fetchTickets());
	}, [dispatch]);

	let content;

	if (status === 'loading') {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {
		content = (
			<div className='overflow-x-auto'>
				<h2 className='text-xl font-bold mb-4'>Ticket list</h2>
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-50'>
						<tr>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Number
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Status
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Buyer Name
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Buyer Contact
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Buyer Email
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								ID
							</th>
							<th scope='col' className='relative px-6 py-3'>
								<span className='sr-only'>Delete</span>
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{Array.isArray(tickets) &&
							tickets.map((ticket, index) => (
								<tr key={index}>
									<td className='px-6 py-4 whitespace-nowrap'>
										{ticket.number}
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										{ticket.status}
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										{ticket.buyerName}
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										{ticket.buyerContact}
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										{ticket.buyerEmail}
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										{ticket.id}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
										<button
											onClick={() =>
												dispatch(
													deleteTicket(ticket.id),
												)
											}
											className='text-red-600 hover:text-red-900'>
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		);
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return (
		<div className='space-y-8'>
			<AddTicketForm />
			<CreateTransaction />
			<TransactionList />
			<UserList />
			{content}
		</div>
	);
};

export default TicketManager;
