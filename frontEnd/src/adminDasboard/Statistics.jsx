import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';
import {
	selectSoldTickets,
	selectReservedTickets,
	selectAvailableTickets,
} from '../features/tickets/ticketSlice';
import PriceInput from './PriceInput';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const Statistics = () => {
	const soldTickets = useSelector(selectSoldTickets);
	const reservedTickets = useSelector(selectReservedTickets);
	const availableTickets = useSelector(selectAvailableTickets);

	const initialTicketPrice =
		parseFloat(localStorage.getItem('ticketPrice')) || 0;

	const [ticketPrice, setTicketPrice] = useState(initialTicketPrice);
	const [currency, setCurrency] = useState('USD');
	const [totalSales, setTotalSales] = useState(0);

	const handlePriceChange = (price, currency) => {
		setTicketPrice(price);
		setCurrency(currency);
		localStorage.setItem('ticketPrice', price);
		localStorage.setItem('currency', currency);
	};

	useEffect(() => {
		const sales = soldTickets.length * ticketPrice;
		setTotalSales(sales);
	}, [soldTickets.length, ticketPrice]);

	const data = {
		labels: ['Sales', 'Reservations', 'Available'],
		datasets: [
			{
				label: 'Count',
				data: [
					soldTickets.length,
					reservedTickets.length,
					availableTickets.length,
				],
				backgroundColor: [
					'rgba(75, 192, 192, 0.6)',
					'rgba(153, 102, 255, 0.6)',
					'rgba(255, 206, 86, 0.6)',
				],
				borderColor: [
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Sales and Reservations Statistics',
			},
		},
	};

	const formatCurrency = (value, currency) => {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: currency,
		}).format(value);
	};

	return (
		<div className='flex flex-col items-center justify-center pt-20'>
			<div className='w-full sm:w-2/3 lg:w-1/2 h-96'>
				<Bar data={data} options={options} />
			</div>
			<div className='mt-10 p-6 bg-white shadow-md rounded-lg w-full sm:w-2/3 lg:w-1/2'>
				<h2 className='text-2xl font-semibold mb-4 text-center'>
					Ticket Statistics
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='p-4 bg-gray-100 rounded-lg shadow-inner'>
						<p className='text-sm font-medium text-gray-500'>
							Total Sales:
						</p>
						<p className='text-xl font-bold text-gray-900'>
							{formatCurrency(totalSales, currency)}
						</p>
					</div>
					<div className='p-4 bg-gray-100 rounded-lg shadow-inner'>
						<p className='text-sm font-medium text-gray-500'>
							Total Tickets Sold:
						</p>
						<p className='text-xl font-bold text-gray-900'>
							{soldTickets.length}
						</p>
					</div>
					<div className='p-4 bg-gray-100 rounded-lg shadow-inner'>
						<p className='text-sm font-medium text-gray-500'>
							Total Tickets Available:
						</p>
						<p className='text-xl font-bold text-gray-900'>
							{availableTickets.length}
						</p>
					</div>
					<div className='p-4 bg-gray-100 rounded-lg shadow-inner'>
						<p className='text-sm font-medium text-gray-500'>
							Total Tickets Reserved:
						</p>
						<p className='text-xl font-bold text-gray-900'>
							{reservedTickets.length}
						</p>
					</div>
				</div>
			</div>
			<div className='mt-10 w-full sm:w-2/3 lg:w-1/2'>
				<PriceInput
					initialPrice={initialTicketPrice}
					onPriceChange={handlePriceChange}
				/>
			</div>
		</div>
	);
};

export default Statistics;
