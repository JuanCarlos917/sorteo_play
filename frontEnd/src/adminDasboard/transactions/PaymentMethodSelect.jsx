import PropTypes from 'prop-types';

const PaymentMethodSelect = ({ paymentMethod, setPaymentMethod }) => (
	<div>
		<label
			htmlFor='paymentMethod'
			className='block text-sm font-medium leading-6 text-gray-900'>
			Payment Method:
		</label>
		<div className='mt-2'>
			<select
				className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
				value={paymentMethod}
				onChange={(e) => setPaymentMethod(e.target.value)}>
				<option value=''>Select Payment Method</option>
				<option value='Nequi'>Nequi</option>
				<option value='DaviPlata'>DaviPlata</option>
				<option value='Bancolombia'>Bancolombia</option>
			</select>
		</div>
	</div>
);

PaymentMethodSelect.propTypes = {
    paymentMethod: PropTypes.string.isRequired,
    setPaymentMethod: PropTypes.func.isRequired,
};

export default PaymentMethodSelect;
