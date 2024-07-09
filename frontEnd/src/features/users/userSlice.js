// src/features/users/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
	users: [],
	status: 'idle',
	error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await axios.get(`${API_BASE_URL}/api/users`);
	return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (user) => {
	const response = await axios.post(`${API_BASE_URL}/api/users`, user);
	return response.data;
});

export const updateUser = createAsyncThunk(
	'users/updateUser',
	async ({ id, user }) => {
		const response = await axios.put(
			`${API_BASE_URL}/api/users/${id}`,
			user,
		);
		return response.data;
	},
);

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
	await axios.delete(`${API_BASE_URL}/api/users/${id}`);
	return id;
});

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.users.push(action.payload);
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				const index = state.users.findIndex(
					(user) => user.id === action.payload.id,
				);
				state.users[index] = action.payload;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.users = state.users.filter(
					(user) => user.id !== action.payload,
				);
			});
	},
});

export default userSlice.reducer;
