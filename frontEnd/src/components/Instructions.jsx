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
				bgcolor: '#8c82b4',
				padding: '16px',
				borderRadius: '10px',
				boxShadow: '2px 20px 10px rgba(0, 0, 0, 0.3)',
			}}>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm pb-10'>
				<img
					className='mx-auto'
					src='https://res.cloudinary.com/dcqkvu95d/image/upload/v1730667452/estrategia_jxqzdd.png'
					alt='logo PlayStation'
					style={{ height: '60px', width: 'auto' }}
				/>
			</div>
			<Typography
				variant='h4'
				component='h1'
				className='text-center mb-4'
				sx={{
					color: '#000',
					marginBottom: '9px',
					fontFamily: '"Dancing Script", cursive', // Fuente cursiva específica
					fontSize: '2.5rem', // Tamaño del texto más grande
					fontWeight: 700, // Más negrita para hacerlo más oscuro
					color: '#FFF6E3', // Color oscuro para el texto
				}}>
				Instrucciones para Participar en el Sorteo
			</Typography>
			<Box className='space-y-4' sx={{ gap: '8px' }}>
				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{
						fontFamily: '"Open Sans", sans-serif',
						fontSize: '1.2rem',
						color: '#333',
					}}>
					1. Selecciona una boleta. Cada boleta tiene un costo de{' '}
					<strong>10 mil pesos.</strong>
				</Typography>
				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{
						fontFamily: '"Open Sans", sans-serif',
						fontSize: '1.2rem',
						color: '#333',
					}}>
					2. Escribe tu nombre y apellido.
				</Typography>
				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{
						fontFamily: '"Open Sans", sans-serif',
						fontSize: '1.2rem',
						color: '#333',
					}}>
					3. Escribe tu email.
				</Typography>
				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{
						fontFamily: '"Open Sans", sans-serif',
						fontSize: '1.2rem',
						color: '#333',
					}}>
					4. Escribe tu número de teléfono.
				</Typography>
				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{
						fontFamily: '"Open Sans", sans-serif',
						fontSize: '1.2rem',
						color: '#333',
					}}>
					5. Puedes enviar el dinero a Nequi, DaviPlata o Davivienda:
				</Typography>
				<Box
					className='text-lg'
					sx={{
						display: 'flex',
						alignItems: 'center',
						color: '#212121',
						fontWeight: 'bold',
						fontFamily: '"Open Sans", sans-serif',
						fontSize: '1.2rem',
						color: '#333',
					}}>
					Nequi y DaviPlata{' '}
					<Button onClick={() => copyToClipboard('3142323534')}>
						<ContentCopyIcon />
					</Button>
					<Typography variant='body1' sx={{ ml: 1 }}>
						3142323534
					</Typography>
				</Box>
				<Box
					className='text-lg'
					sx={{
						display: 'flex',
						alignItems: 'center',
						color: '#212121',
						fontWeight: 'bold',
						fontFamily: '"Open Sans", sans-serif',
						fontSize: '1.2rem',
						color: '#333',
					}}>
					Davienda Ahorros{' '}
					<Button onClick={() => copyToClipboard('476200088062')}>
						<ContentCopyIcon />
					</Button>
					<Typography variant='body1' sx={{ ml: 1 }}>
						476200088062
					</Typography>
				</Box>
				<Typography
					variant='h6'
					component='p'
					className='text-lg'
					sx={{
						fontFamily: '"Open Sans", sans-serif',
						fontSize: '1.2rem',
						color: '#333',
					}}>
					6. Para enviar el comprobante de pago del sorteo de $500 Mil
					pesos, puedes hacerlo de dos maneras:
				</Typography>
				<Typography
					variant='body1'
					component='p'
					className='text-base'
					sx={{
						fontFamily: '"Open Sans", sans-serif',
						fontSize: '1rem',
						color: '#333',
					}}>
					<strong>Opción 1:</strong> Haz clic en el botón de WhatsApp
					flotante en la esquina inferior derecha de la pantalla.
					Luego selecciona la opción{' '}
					<strong>Enviar comprobante de pago</strong>
				</Typography>
				<Typography
					variant='body1'
					component='p'
					className='text-base'
					sx={{
						fontFamily: '"Open Sans", sans-serif',
						fontSize: '1rem',
						color: '#333',
					}}>
					<strong>Opción 2:</strong> Envía un mensaje directamente al
					número <strong>3142323534</strong> con el comprobante de
					pago adjunto.
				</Typography>
				<Typography
					variant='body2'
					component='p'
					className='text-sm mt-6'
					sx={{
						marginTop: '24px',
						fontFamily: '"Open Sans", sans-serif',
						fontSize: '0.9rem',
						color: '#333',
					}}>
					Se sorteará un valor de $500.000 (Quinientos mil pesos MLC)
					y el premio se entregará con los tres últimos dígitos de la
					Lotería de Bogotá. En el evento que el rango de los últimos
					tres dígitos supere el rango máximo de las boletas, se
					tomará los últimos tres dígitos de la Lotería de Boyacá. El
					sorteo se realizará el 5 de diciembre de 2024 o cuando Se
					haya vendido la totalidad de las boletas, lo que ocurra
					primero.
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
