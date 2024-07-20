import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../features/transactions/transactionSlice';

const TransactionList = () => {
	const dispatch = useDispatch();
	const transactions = useSelector(
		(state) => state.transactions.transactions,
	);
	const status = useSelector((state) => state.transactions.status);
	const error = useSelector((state) => state.transactions.error);

	useEffect(() => {
		dispatch(fetchTransactions());
	}, [dispatch]);

	let content;

	if (status === 'loading') {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {
		content = (
			<div className='overflow-x-auto pt-5'>
				<h2 className='text-xl font-bold mb-4'>Transaction List</h2>
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-50'>
						<tr>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								User ID
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Ticket ID
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Transaction Type
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Payment Method
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{transactions.map((transaction, index) => (
							<tr key={index}>
								<td className='px-6 py-4 whitespace-nowrap'>
									{transaction.user_id}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{transaction.ticket_id}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{transaction.transaction_type}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{transaction.paymentMethod}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return <div>{content}</div>;
};

export default TransactionList;
