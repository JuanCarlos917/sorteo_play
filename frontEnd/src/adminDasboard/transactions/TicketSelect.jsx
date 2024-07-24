import PropTypes from 'prop-types';
const TicketSelect = ({
	tickets,
	ticketId,
	setTicketId,
	transactionType,
	transactions,
	cancelTransactionId,
	oldTicketNumber,
	newTicketId,
	setNewTicketId,
}) => {
	const reservedTicket = tickets.filter(
		(ticket) => ticket.status === 'Reservado',
	);
	const sortedReserved = reservedTicket.sort((a, b) => a.number - b.number);

	return (
		<>
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
							onChange={(e) => setTicketId(e.target.value)}
							required
							className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
							<option value=''>Select Ticket</option>
							{sortedReserved.map((ticket) => (
								<option key={ticket.id} value={ticket.id}>
									{ticket.number}
								</option>
							))}
						</select>
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
							onChange={(e) => setTicketId(e.target.value)}
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
								onChange={(e) => setNewTicketId(e.target.value)}
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
								<option value=''>Select New Ticket</option>
								{tickets
									.filter(
										(ticket) =>
											ticket.status === 'Disponible',
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
		</>
	);
};

TicketSelect.propTypes = {
	tickets: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			status: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		}),
	).isRequired,
	ticketId: PropTypes.string.isRequired,
	setTicketId: PropTypes.func.isRequired,
	transactionType: PropTypes.string.isRequired,
	transactions: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			ticket_id: PropTypes.string.isRequired,
			transaction_type: PropTypes.string.isRequired,
		}),
	).isRequired,
	cancelTransactionId: PropTypes.string,
	oldTicketNumber: PropTypes.string,
	newTicketId: PropTypes.string.isRequired,
	setNewTicketId: PropTypes.func.isRequired,
};

export default TicketSelect;
