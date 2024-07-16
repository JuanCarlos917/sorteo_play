import PropTypes from 'prop-types';

const TransactionTypeSelect = ({ transactionType, setTransactionType }) => (
	<div>
		<label
			htmlFor='transactionType'
			className='block text-sm font-medium leading-6 text-gray-900'>
			Transaction Type
		</label>
		<div className='mt-2'>
			<select
				id='transactionType'
				name='transactionType'
				value={transactionType}
				onChange={(e) => setTransactionType(e.target.value)}
				required
				className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
				<option value='purchase'>Purchase</option>
				<option value='cancellation'>Cancellation</option>
				<option value='change'>Change</option>
			</select>
		</div>
	</div>
);

TransactionTypeSelect.propTypes = {
	transactionType: PropTypes.string.isRequired,
	setTransactionType: PropTypes.func.isRequired,
};

export default TransactionTypeSelect;
