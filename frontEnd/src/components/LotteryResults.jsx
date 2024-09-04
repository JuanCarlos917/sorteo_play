import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const LotteryResults = () => {
	const [showConfetti, setShowConfetti] = useState(false);
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const lotteries = [
		{
			name: 'Bogotá',
			winningNumber: '',
			date: '05 de Septiembre 2024',
			time: '22:30',
		},
		{
			name: 'Medellín',
			winningNumber: '',
			date: '06 de Septiembre 2024',
			time: '23:00',
		},
		{
			name: 'Boyacá',
			winningNumber: '',
			date: '07 de Septiembre 2024',
			time: '22:30',
		},
	];

	const ticketRange = 400;

	// Hook para verificar los números ganadores y mostrar confeti si es necesario
	useEffect(() => {
		const shouldShowConfetti = lotteries.some(
			(lottery) =>
				lottery.winningNumber > 4000 &&
				lottery.winningNumber <= ticketRange,
		);

		if (shouldShowConfetti) {
			setShowConfetti(true);
			setTimeout(() => setShowConfetti(false), 11000); // Mostrar confeti por 10 segundos
		}
	}, [lotteries]);

	// Hook para actualizar el tamaño de la ventana cuando cambie
	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className='top-0 bg-blue-500 text-white p-4 shadow-lg z-50'>
			<div className='container mx-auto flex flex-col sm:flex-row items-center justify-between'>
				<h2 className='text-lg sm:text-xl font-bold mb-4 sm:mb-0'>
					<strong>Último</strong> Sorteo Loterías Resultado
				</h2>
				<div className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4'>
					{lotteries.map((lottery, index) => (
						<div
							key={index}
							className='flex flex-col items-center text-center'>
							<p className='font-bold'>{lottery.name}</p>
							<p>Fecha Sorteo: {lottery.date}</p>
							<p>Hora: {lottery.time}</p>
							<p>
								Número: {lottery.winningNumber || 'Por definir'}
							</p>
							{lottery.winningNumber > ticketRange ? (
								<p className='text-red-200'>
									Supera el rango permitido
								</p>
							) : lottery.winningNumber === '' ? (
								<p className='text-yellow-200'>
									Esperando resultado
								</p>
							) : (
								//<p className='text-green-200'>Número Ganador</p>
								<p className='text-red-200'>
									Boleta no vendida
								</p>
							)}
						</div>
					))}
				</div>
				{showConfetti && (
					<Confetti
						width={windowSize.width}
						height={windowSize.height}
					/>
				)}
			</div>
		</div>
	);
};

export default LotteryResults;
