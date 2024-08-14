import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchUsers,
	deleteUser,
	updateUser,
} from '../features/users/userSlice';
import Loading from '../components/Loading';
import { Box } from '@mui/material';

const UserList = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.users);
	const status = useSelector((state) => state.users.status);
	const error = useSelector((state) => state.users.error);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	const handleDelete = (id) => {
		dispatch(deleteUser(id));
	};

	const handleUpdate = (id) => {
		const name = prompt('Enter new name:');
		const email = prompt('Enter new email:');
		const phone = prompt('Enter new phone:');
		if (name && email && phone) {
			dispatch(updateUser({ id, user: { name, email, phone } }));
		}
	};

	let content;

	if (status == 'loading') {
		content = (
			<Box
				className='pt-10'
				display='flex'
				justifyContent='center'
				alignItems='center'>
				<Loading />
			</Box>
		);
	} else if (status === 'succeeded') {
		content = (
			<div className='overflow-x-auto pt-5'>
				<h2 className='text-xl font-bold mb-4'>Buyers</h2>
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-50'>
						<tr>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Name
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Email
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Phone
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								ID
							</th>
							<th scope='col' className='relative px-6 py-3'>
								<span className='sr-only'>Edit</span>
							</th>
							<th scope='col' className='relative px-6 py-3'>
								<span className='sr-only'>Delete</span>
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{users.map((user) => (
							<tr key={user.id}>
								<td className='px-6 py-4 whitespace-nowrap'>
									{user.name}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{user.email}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{user.phone}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{user.id}
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
									<button
										onClick={() => handleUpdate(user.id)}
										className='text-indigo-600 hover:text-indigo-900'>
										Edit
									</button>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
									<button
										onClick={() => handleDelete(user.id)}
										className='text-red-600 hover:text-red-900'>
										Delete
									</button>
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

export default UserList;
