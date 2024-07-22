import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const PriceInput = ({ initialPrice, onPriceChange }) => {
	const [currency, setCurrency] = useState('USD');
	const [price, setPrice] = useState(initialPrice);

	const handlePriceChange = (e) => {
		const newPrice = parseFloat(e.target.value);
		setPrice(newPrice);
		onPriceChange(newPrice, currency);
	};

	const handleCurrencyChange = (e) => {
		setCurrency(e.target.value);
		onPriceChange(price, e.target.value);
	};

	useEffect(() => {
		setPrice(initialPrice);
	}, [initialPrice]);

	return (
		<div>
			<label
				htmlFor='price'
				className='block text-sm font-medium leading-6 text-gray-900'>
				Price
			</label>
			<div className='relative mt-2 rounded-md shadow-sm'>
				<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
					<span className='text-gray-500 sm:text-sm'>
						{currency === 'COP' ? '₱' : '$'}
					</span>
				</div>
				<input
					id='price'
					name='price'
					type='text'
					value={price}
					onChange={handlePriceChange}
					placeholder='0.00'
					className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
				/>
				<div className='absolute inset-y-0 right-0 flex items-center'>
					<label htmlFor='currency' className='sr-only'>
						Currency
					</label>
					<select
						id='currency'
						name='currency'
						value={currency}
						onChange={handleCurrencyChange}
						className='h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm'>
						<option value='USD'>USD</option>
						<option value='COP'>COP</option>
					</select>
				</div>
			</div>
		</div>
	);
};

PriceInput.propTypes = {
    initialPrice: PropTypes.number.isRequired,
    onPriceChange: PropTypes.func.isRequired,
};

export default PriceInput;
