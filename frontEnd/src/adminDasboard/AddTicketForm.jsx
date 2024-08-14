import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket, fetchTickets } from '../features/tickets/ticketSlice';
import Loading from '../components/Loading';
import { Box, Typography, TextField, Button } from '@mui/material';

const AddTicketForm = () => {
	const dispatch = useDispatch();
	const status = useSelector((state) => state.tickets.status);
	const error = useSelector((state) => state.tickets.error);

	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [number, setNumber] = useState('');
	const [message, setMessage] = useState(null);

	// Efecto para manejar el mensaje de éxito o error después de crear un ticket
	useEffect(() => {
		if (status === 'succeeded') {
			setMessage('Ticket(s) created successfully!');
			setStart('');
			setEnd('');
			setNumber('');
		} else if (status === 'failed') {
			setMessage(`Failed to create ticket(s): ${error}`);
		}
	}, [status, error]);

	const handleCreate = (e) => {
		e.preventDefault();
		setMessage(null); // Resetea el mensaje antes de intentar crear un nuevo ticket

		if (start && end) {
			dispatch(
				createTicket({
					start: parseInt(start, 10),
					end: parseInt(end, 10),
				}),
			);
		} else if (number) {
			dispatch(createTicket({ number: parseInt(number, 10) }));
		}

		// Fetch tickets to update the list immediately
		dispatch(fetchTickets());
	};

	let content;

	if (status === 'loading') {
		content = (
			<Box
				className='pt-10'
				display='flex'
				justifyContent='center'
				alignItems='center'>
				<Loading />
			</Box>
		);
	} else {
		content = (
			<div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm pt-10'>
					<Typography variant='h4' align='center' gutterBottom>
						Add Tickets
					</Typography>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form className='space-y-6' onSubmit={handleCreate}>
						{message && (
							<div
								className={`p-4 mb-4 rounded-lg ${
									message.includes('Failed')
										? 'text-red-700 bg-red-100'
										: 'text-green-700 bg-green-100'
								}`}>
								{message}
							</div>
						)}

						<TextField
							id='start'
							name='start'
							label='Start Number'
							type='number'
							value={start}
							onChange={(e) => setStart(e.target.value)}
							variant='outlined'
							margin='normal'
							fullWidth
							InputLabelProps={{
								shrink: true,
							}}
						/>

						<TextField
							id='end'
							name='end'
							label='End Number'
							type='number'
							value={end}
							onChange={(e) => setEnd(e.target.value)}
							variant='outlined'
							margin='normal'
							fullWidth
							InputLabelProps={{
								shrink: true,
							}}
						/>

						<TextField
							id='number'
							name='number'
							label='Single Ticket Number'
							type='number'
							value={number}
							onChange={(e) => setNumber(e.target.value)}
							variant='outlined'
							margin='normal'
							fullWidth
							InputLabelProps={{
								shrink: true,
							}}
						/>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className='bg-indigo-600 hover:bg-indigo-500'
							disabled={status === 'loading'}>
							{status === 'loading'
								? 'Enviando...'
								: 'Add Ticket'}
						</Button>
					</form>
				</div>
			</div>
		);
	}

	return <div>{content}</div>;
};

export default AddTicketForm;
