// src/components/TicketManager.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, deleteTicket } from '../features/tickets/ticketSlice';
import AddTicketForm from './AddTicketForm';
// import SellTicketForm from './SellTicketForm';
// import ChangeTicketForm from './ChangeTicketForm';
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
			<div>
				<h2>Ticket list</h2>
				<ul>
					{Array.isArray(tickets) &&
						tickets.map((ticket, index) => (
							<li key={index}>
								{ticket.number} - {ticket.status} -{' '}
								{ticket.buyerName} - {ticket.buyerContact} -{' '}
								{ticket.buyerEmail} - {ticket.id}
								<button
									onClick={() =>
										dispatch(deleteTicket(ticket.id))
									}>
									Delete
								</button>
							</li>
						))}
				</ul>
			</div>
		);
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return (
		<div>
			<AddTicketForm />
			{/* <SellTicketForm /> */}
			{/* <ChangeTicketForm /> */}
            <CreateTransaction/>
            <TransactionList/>
            <UserList />
			{content}
		</div>
	);
};

export default TicketManager;