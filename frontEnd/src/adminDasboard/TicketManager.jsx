import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	searchTickets,
	fetchTickets,
	deleteTicket,
} from '../features/tickets/ticketSlice';
import TicketFilter from './TicketFilter';

const TicketManager = () => {
	const dispatch = useDispatch();
	const tickets = useSelector((state) => state.tickets.tickets);
	const status = useSelector((state) => state.tickets.status);
	const error = useSelector((state) => state.tickets.error);

	const [filterText, setFilterText] = useState('');

	useEffect(() => {
		if (!filterText) {
			dispatch(fetchTickets());
		}
	}, [dispatch, filterText]);

	const handleSearch = () => {
		if (filterText.trim() !== '') {
			dispatch(searchTickets(filterText));
		} else {
			dispatch(fetchTickets());
		}
	};

	let content;

	if (status === 'loading') {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {
		if (!Array.isArray(tickets) || tickets.length === 0) {
			content = <div>No tickets found</div>;
		} else {
			const sortedTickets = [...tickets].sort((a, b) => {
				if (a.status === 'Vendida' && b.status !== 'Vendida') {
					return -1;
				}
				if (a.status !== 'Vendida' && b.status === 'Vendida') {
					return 1;
				}
				return a.number - b.number;
			});

			content = (
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
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{sortedTickets.map((ticket, index) => (
							<tr
								key={index}
								className={
									ticket.status === 'Vendida'
										? 'bg-green-100 text-green-800'
										: ticket.status === 'Reservado'
										? 'bg-yellow-100 text-yellow-800'
										: 'bg-red-100 text-red-800'
								}>
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
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
									<button
										onClick={() =>
											dispatch(deleteTicket(ticket.id))
										}
										className='text-red-600 hover:text-red-900'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			);
		}
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return (
		<div className='overflow-x-auto pt-20 p-2'>
			<h2 className='text-xl font-bold mb-4'>Ticket list</h2>
			<TicketFilter
				filterText={filterText}
				onFilterTextChange={setFilterText}
				onSearch={handleSearch}
			/>
			{content}
		</div>
	);
};

export default TicketManager;
