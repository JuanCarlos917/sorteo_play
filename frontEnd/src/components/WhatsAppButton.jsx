import { useState, useRef } from 'react';
import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Draggable from 'react-draggable';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const WhatsAppButton = () => {
	const [position, setPosition] = useState({
		x: window.innerWidth - 60,
		y: 500,
	});
	const nodeRef = useRef(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleStop = (e, data) => {
		const windowWidth = window.innerWidth;
		const newX = data.x < windowWidth / 2 ? 0 : windowWidth - 56; // 56 es el tamaño del botón
		setPosition({ x: newX, y: data.y });
	};

	const handleButtonClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOptionClick = (message) => {
		window.open(
			`https://wa.me/3132074757?text=${encodeURIComponent(
				message,
			)}`,
			'_blank',
		);
		handleClose();
	};

	return (
		<Draggable nodeRef={nodeRef} position={position} onStop={handleStop}>
			<div ref={nodeRef} style={{ position: 'fixed', zIndex: 1000 }}>
				<Fab
					color='primary'
					aria-label='whatsapp'
					onClick={handleButtonClick}>
					<WhatsAppIcon />
				</Fab>
				<Menu
					anchorEl={anchorEl}
					open={open}
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
							handleOptionClick('Hola, tengo una duda sobre el sorteo del PS5')
						}>
						Tengo una duda 🤔
					</MenuItem>
				</Menu>
			</div>
		</Draggable>
	);
};

export default WhatsAppButton;
