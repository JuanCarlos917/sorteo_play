// src/components/UserList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchUsers,
	deleteUser,
	updateUser,
} from '../features/users/userSlice';

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

	if (status === 'loading') {
		content = <div>Loading...</div>;
	} else if (status === 'succeeded') {
		content = (
			<ul>
				<h2>Buyers</h2>
				{users.map((user) => (
					<li key={user.id}>
						{user.name} - {user.email} - {user.phone} -{user.id}
						<button onClick={() => handleUpdate(user.id)}>
							Edit
						</button>
						<button onClick={() => handleDelete(user.id)}>
							Delete
						</button>
					</li>
				))}
			</ul>
		);
	} else if (status === 'failed') {
		content = <div>{error}</div>;
	}

	return <div>{content}</div>;
};

export default UserList;
