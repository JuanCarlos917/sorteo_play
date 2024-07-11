// src/components/TransactionList.jsx
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
			<table>
				<thead>
					<tr>
						{/* <th>User ID</th> */}
						<th>Ticket ID</th>
						<th>Transaction Type</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction, index) => (
						<tr key={index}>
							{/* <td>{transaction.id}</td>
							<td>{transaction.user_id}</td> */}
							<td>{transaction.ticket_id}</td>
							<td>{transaction.transaction_type}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return <div>{content}</div>;
};

export default TransactionList;
