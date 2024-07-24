import { useState } from 'react';
import {
	Typography,
	Box,
	Container,
	Button,
	Snackbar,
	Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const Instructions = () => {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');

	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text).then(
			() => {
				setSnackbarMessage('Número copiado al portapapeles');
				setSnackbarSeverity('success');
				setSnackbarOpen(true);
			},
			(err) => {
				setSnackbarMessage('Error al copiar el texto: ' + err);
				setSnackbarSeverity('error');
				setSnackbarOpen(true);
			},
		);
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	return (
		<Container
			maxWidth={false}
			className='p-8 rounded-lg shadow-lg text-gray-300 font-rubik '
			sx={{
				width: '100%',
				bgcolor: '#b4bbcd',
				padding: '16px',
				borderRadius: '10px',
				boxShadow: '2px 20px 10px rgba(0, 0, 0, 0.3)',
			}}>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm pb-10'>
				<img
					className='mx-auto'
					src='https://res.cloudinary.com/dcqkvu95d/image/upload/v1721510186/Sony_logo_d1lheu.svg'
					alt='logo PlayStation'
					style={{ height: '20px', width: 'auto' }}
				/>
			</div>
			<Typography
				variant='h4'
				component='h1'
				className='text-center mb-4'
				sx={{
					color: '#000',
					marginBottom: '9px',
				}}>
				Instrucciones para Participar en el Sorteo
			</Typography>
			<Box className='space-y-4' sx={{ gap: '8px' }}>
				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{ color: '#212121' }}>
					1. Seleccionar una boleta. Cada boleta tiene un costo de{' '}
					<strong>10 mil pesos.</strong>
				</Typography>
				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{ color: '#212121' }}>
					2. Escribe tu nombre y apellido.
				</Typography>
				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{ color: '#212121' }}>
					3. Escribe tu email.
				</Typography>
				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{ color: '#212121' }}>
					4. Escribe tu número de teléfono.
				</Typography>
				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{ color: '#212121' }}>
					5. Puedes enviar el dinero a Nequi, DaviPlata o Bancolombia:
				</Typography>
				<Box
					className='text-lg'
					sx={{
						display: 'flex',
						alignItems: 'center',
						color: '#212121',
						fontWeight: 'bold',
					}}>
					Nequi y DaviPlata{' '}
					<Button onClick={() => copyToClipboard('3132074757')}>
						<ContentCopyIcon />
					</Button>
					<Typography variant='body1' sx={{ ml: 1 }}>
						3132074757
					</Typography>
				</Box>
				<Box
					className='text-lg'
					sx={{
						display: 'flex',
						alignItems: 'center',
						color: '#212121',
						fontWeight: 'bold',
					}}>
					Bancolombia Ahorros{' '}
					<Button onClick={() => copyToClipboard('94600021308')}>
						<ContentCopyIcon />
					</Button>
					<Typography variant='body1' sx={{ ml: 1 }}>
						94600021308
					</Typography>
				</Box>

				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{ color: '#212121', fontWeight: 'bold' }}>
					6. Envia tu comprobante de consignación al número 3132074757
					Para registrar tu boleta y participar en el sorteo.
				</Typography>
				<Typography
					variant='body2'
					component='p'
					className='text-sm mt-6'
					sx={{ color: '#212121', marginTop: '24px' }}>
					Se sorteará un Play Station 5 Slim digital y el premio se
					entregará con los tres últimos dígitos de la Lotería de
					Bogotá. En el evento que el rango de los últimos tres
					dígitos supere el rango máximo de las boletas, se tomará los
					últimos tres dígitos de la Lotería de Medellín y, en el
					último caso, que ninguna de las dos se cumpla, se sorteará
					con la Lotería de Boyacá. Si ninguno de los escenearios
					anteriores se cumple, vuelve y se sortea al dia siguiente,
					hasta que haya un ganador. El sorteo se realizará el 30 de
					agosto de 2024 o cuando se hayan vendido todas las boletas,
					lo que ocurra primero.
				</Typography>
			</Box>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarSeverity}
					sx={{ width: '100%' }}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default Instructions;
