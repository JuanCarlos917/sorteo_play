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
import sony from '../assets/Sony_logo.svg';

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
				bgcolor: '#cfd8dc',
				padding: '16px',
				borderRadius: '10px',
				boxShadow: '0px 5px 9px rgba(0, 0, 0, 1.6)',
			}}>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm pb-10'>
				<img
					className='mx-auto'
					src={sony}
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
					1. Seleccionar una boleta.
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
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						Nequi y DaviPlata{' '}
						<Button onClick={() => copyToClipboard('3132074757')}>
							<ContentCopyIcon />
						</Button>
						<Typography variant='body1' sx={{ ml: 1 }}>
							3132074757
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						Bancolombia Ahorros{' '}
						<Button onClick={() => copyToClipboard('94600021308')}>
							<ContentCopyIcon />
						</Button>
						<Typography variant='body1' sx={{ ml: 1 }}>
							94600021308
						</Typography>
					</Box>
				</Typography>
				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{ color: '#212121', fontWeight: 'bold' }}>
					6. Envia tu comprobante de consignación al número
					3132074757.
				</Typography>
				<Typography
					variant='body2'
					component='p'
					className='text-sm mt-6'
					sx={{ color: '#212121', marginTop: '24px' }}>
					Se sorteará un Play Station 5 digital y el premio se
					entregará con los tres últimos dígitos de la Lotería de
					Bogotá. En el evento que el rango de los últimos tres
					dígitos supere el rango máximo de las boletas, se tomará los
					últimos tres dígitos de la Lotería de Medellín y, en el
					último caso, que ninguna de las dos se cumpla, se sorteará
					con la Lotería de Boyacá.
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