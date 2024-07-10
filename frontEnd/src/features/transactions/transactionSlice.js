// src/features/transactions/transactionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
	transactions: [],
	status: 'idle',
	error: null,
};

export const fetchTransactions = createAsyncThunk(
	'transactions/fetchTransactions',
	async () => {
		const response = await axios.get(`${API_BASE_URL}/api/transactions`);
		return response.data;
	},
);

export const createTransaction = createAsyncThunk(
	'transactions/createTransaction',
	async (transaction) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/transactions`,
			transaction,
		);
		return response.data;
	},
);

export const cancelTransaction = createAsyncThunk(
	'transactions/cancelTransaction',
	async (transaction_id) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/transactions/cancel/${transaction_id}`,
		);
		return response.data;
	},
);

export const changeTicket = createAsyncThunk(
	'transactions/changeTicket',
	async (transaction) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/transactions/change`,
			transaction,
		);
		return response.data;
	},
);

const transactionSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTransactions.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchTransactions.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.transactions = action.payload;
			})
			.addCase(fetchTransactions.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createTransaction.fulfilled, (state, action) => {
				state.transactions.push(action.payload);
			})
			.addCase(cancelTransaction.fulfilled, (state, action) => {
				state.transactions.push(action.payload);
			})
			.addCase(changeTicket.fulfilled, (state, action) => {
				state.transactions.push(action.payload);
			});
	},
});

export default transactionSlice.reducer;
