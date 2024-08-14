import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../features/tickets/ticketSlice';
import {
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	Typography,
	Box,
} from '@mui/material';
import Loading from './Loading'

const AvailableTickets = ({
	onTicketChange,
	selectedTicket,
	setTicketsAvailable,
}) => {
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

	const sortedTickets = availableTickets.sort((a, b) => a.number - b.number);

	useEffect(() => {
		setTicketsAvailable(availableTickets.length > 0);
	}, [availableTickets, setTicketsAvailable]);

	let content;

	if (status === 'loading') {
		content = (
			<Box display='flex' justifyContent='center' alignItems='center'>
				<Loading />
			</Box>
		);
	} else if (status === 'succeeded') {
		if (availableTickets.length === 0) {
			content = (
				<Typography variant='body1' color='textSecondary'>
					No tickets available
				</Typography>
			);
		} else {
			content = (
				<FormControl fullWidth margin='normal'>
					<InputLabel
						id='ticket-select-label'
						sx={{
							color: '#f73b00',
							'&.Mui-focused': {
								color: '#263238',
							},
						}}>
						Boletas Disponibles
					</InputLabel>
					<Select
						labelId='ticket-select-label'
						id='tickets'
						name='tickets'
						value={selectedTicket}
						onChange={onTicketChange}
						label='Available Tickets'
						required
						sx={{
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderColor: '#e0e0e0',
								},
								'&:hover fieldset': {
									borderColor: '#c0c0c0',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#eeeeee',
								},
							},
							'& .MuiInputBase-input': {
								color: '#ff3d00',
							},
							'& .MuiSvgIcon-root': {
								color: '#e0e0e0',
							},
						}}>
						<MenuItem value=''>
							<em>Seleccione un Número</em>
						</MenuItem>
						{sortedTickets.map((ticket) => (
							<MenuItem key={ticket.id} value={ticket.id}>
								{ticket.number}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			);
		}
	} else if (status === 'failed') {
		content = (
			<Typography variant='body1' color='error'>
				{error}
			</Typography>
		);
	}

	return <Box>{content}</Box>;
};

AvailableTickets.propTypes = {
	onTicketChange: PropTypes.func.isRequired,
	selectedTicket: PropTypes.string.isRequired,
	setTicketsAvailable: PropTypes.func.isRequired,
};

export default AvailableTickets;
