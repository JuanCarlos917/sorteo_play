const UserSelect = ({ users, userId, setUserId }) => (
	<div>
		<label
			htmlFor='userId'
			className='block text-sm font-medium leading-6 text-gray-900'>
			User Name
		</label>
		<div className='mt-2'>
			<select
				id='userId'
				name='userId'
				value={userId}
				onChange={(e) => setUserId(e.target.value)}
				required
				className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
				<option value=''>Select User</option>
				{users.map((user) => (
					<option key={user.id} value={user.id}>
						{user.name} - {user.email} - {user.phone}
					</option>
				))}
			</select>
		</div>
	</div>
);

export default UserSelect;
