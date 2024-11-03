import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../features/users/userSlice';
import { reserveTicket } from '../features/tickets/ticketSlice';
import AvailableTickets from './AvailableTickets';
import UserInfoForm from './UserInfoForm';
import ImageCarousel from './ImageCarousel';
import {
	validateName,
	validateEmail,
	validatePhone,
} from '../utils/validation';
import { Button, Typography, Box, Container, Alert } from '@mui/material';

const UserForm = () => {
	const dispatch = useDispatch();
	const [selectedTicket, setSelectedTicket] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [error, setError] = useState({});
	const [message, setMessage] = useState('');
	const [ticketsAvailable, setTicketsAvailable] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const ticketError = useSelector((state) => state.tickets.error);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const nameError = validateName(name);
		const emailError = validateEmail(email);
		const phoneError = validatePhone(phone);

		if (nameError || emailError || phoneError) {
			setError({ name: nameError, email: emailError, phone: phoneError });
            setIsLoading(false);
			return;
		}

		try {
			const userResult = await dispatch(
				createUser({ name, email, phone }),
			);
			const user = userResult.payload;

			if (user && selectedTicket) {
				const reserveResult = await dispatch(
					reserveTicket({
						ticket_id: selectedTicket,
						user_id: user.id,
					}),
				);

				if (reserveResult.type === 'tickets/reserveTicket/fulfilled') {
					setMessage(
						'Gracias por su compra. El boleto se ha adquirido correctamente.',
					);
					setName('');
					setEmail('');
					setPhone('');
					setSelectedTicket('');
				} else {
					setMessage('Hubo un error al reservar la boleta.');
				}
			}
		} catch (err) {
			setMessage('Hubo un error al procesar su solicitud.');
		}
        setIsLoading(false);
	};

	const handleTicketChange = (e) => {
		setSelectedTicket(e.target.value);
	};

	return (
		<Container
			maxWidth='sm'
			className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
			<div>
				<ImageCarousel />
			</div>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm mt-10'>
				<div className='flex justify-center items-center space-x-4'>
					<img
						src='https://res.cloudinary.com/dcqkvu95d/image/upload/v1730666215/regalo_nl5dlw.png'
						alt='PlayStation Logo'
						style={{ height: '50px', width: 'auto' }}
					/>
					<img
						src='https://res.cloudinary.com/dcqkvu95d/image/upload/v1730666298/ganador_yrcq0e.png'
						alt='PS5'
						style={{ height: '50px', width: 'auto' }}
					/>
				</div>
				<Typography
					component='h2'
					variant='h1'
					className='mt-10 text-center tracking-tight'
					sx={{
						fontFamily: '"Dancing Script", cursive', // Fuente cursiva específica
						fontSize: '2.5rem', // Tamaño del texto más grande
						fontWeight: 700, // Más negrita para hacerlo más oscuro
						color: '#FFF6E3', // Color oscuro para el texto
					}}>
					Sorteo de $500.000
				</Typography>
				{/* <Box
					display='flex'
					justifyContent='center'
					mt={2}
					className='space-x-4'>
					<img
						className='mx-2'
						src='https://res.cloudinary.com/dcqkvu95d/image/upload/v1721510189/icons8-call-of-duty-mobile_y32wy3.svg'
						alt='COD'
						style={{ height: '40px', width: 'auto' }}
					/>
					<img
						className='mx-2'
						src='https://res.cloudinary.com/dcqkvu95d/image/upload/v1721510189/EA_Sports_FC_24_logo_c2mgzg.svg'
						alt='FIFA 24'
						style={{ height: '40px', width: 'auto' }}
					/>
				</Box> */}
			</div>
			<Box
				component='form'
				onSubmit={handleSubmit}
				className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<AvailableTickets
					onTicketChange={handleTicketChange}
					selectedTicket={selectedTicket}
					setTicketsAvailable={setTicketsAvailable}
				/>
				<UserInfoForm
					name={name}
					setName={setName}
					email={email}
					setEmail={setEmail}
					phone={phone}
					setPhone={setPhone}
					error={error}
				/>
				<Button
					type='submit'
					variant='contained'
					fullWidth
					disabled={!ticketsAvailable || isLoading}
					sx={{
						fontFamily: '"Dancing Script", cursive', // Fuente cursiva específica
						color: '#FFF6E3',
						mt: 2,
						bgcolor: 'transparent',
						background:
							'linear-gradient(to right, #e0e0e0, transparent)',
						borderRadius: '4px',
						boxShadow: '0px 5px 9px rgba(0, 0, 0, 1.6)',
						'&:hover': {
							background:
								'linear-gradient(to right, #FFF9BF, transparent)',
						},
						'&:focus-visible': {
							outline: '2px solid #3b82f6',
							outlineOffset: '2px',
						},
					}}>
					{isLoading ? 'Enviando...' : 'Registrar'}
				</Button>
				{message && (
					<Typography
						variant='body1'
						color='success.main'
						className='text-center mt-2 pt-6'>
						{message}
					</Typography>
				)}
				{ticketError && (
					<Alert severity='error' className='mt-2'>
						{ticketError}
					</Alert>
				)}
			</Box>
		</Container>
	);
};

export default UserForm;
