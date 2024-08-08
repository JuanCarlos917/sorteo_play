import { useState } from 'react';
import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const WhatsAppButton = () => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleButtonClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOptionClick = (message) => {
		window.open(
			`https://wa.me/3132074757?text=${encodeURIComponent(message)}`,
			'_blank',
		);
		handleClose();
	};

	return (
		<div className='fixed bottom-2 right-2 z-50'>
			<Fab
				color='primary'
				aria-label='whatsapp'
				onClick={handleButtonClick}>
				<WhatsAppIcon />
			</Fab>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}>
				<MenuItem
					onClick={() =>
						handleOptionClick(
							'Hola, te envío el comprobante de pago del sorteo del PS5.',
						)
					}>
					Enviar comprobante de pago
				</MenuItem>
				<MenuItem
					onClick={() =>
						handleOptionClick(
							'Hola, tengo una duda sobre el sorteo del PS5',
						)
					}>
					Tengo una duda 🤔
				</MenuItem>
			</Menu>
		</div>
	);
};

export default WhatsAppButton;
