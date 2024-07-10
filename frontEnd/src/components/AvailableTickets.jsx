import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../features/tickets/ticketSlice';

const AvailableTickets = ({ onTicketChange, selectedTicket }) => {
	const dispatch = useDispatch();
	const tickets = useSelector((state) => state.tickets.tickets);
	const status = useSelector((state) => state.tickets.status);
	const error = useSelector((state) => state.tickets.error);

	useEffect(() => {
		dispatch(fetchTickets());
	}, [dispatch]);

	const availableTickets = tickets.filter(
		(ticket) => ticket.status === 'Disponible',
	);

	let content;

	if (status === 'loading') {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {
		if (availableTickets.length === 0) {
			content = <div>No tickets available</div>;
		} else {
			content = (
				<div>
					<label htmlFor='tickets'>Available Tickets:</label>
					<select
						id='tickets'
						name='tickets'
						value={selectedTicket}
						onChange={onTicketChange}>
						<option value=''>Select a ticket</option>
						{availableTickets.map((ticket) => (
							<option key={ticket.id} value={ticket.id}>
								{ticket.number}
							</option>
						))}
					</select>
				</div>
			);
		}
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return <div>{content}</div>;
};

export default AvailableTickets;
