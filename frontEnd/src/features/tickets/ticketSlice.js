// src/features/tickets/ticketSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const initialState = {
	tickets: [],
	status: 'idle',
	error: null,
};

export const fetchTickets = createAsyncThunk(
	'tickets/fetchTickets',
	async () => {
		const response = await axios.get(`${API_BASE_URL}/api/tickets`);
		return response.data;
	},
);

export const createTicket = createAsyncThunk(
	'tickets/createTicket',
	async (ticket) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/tickets`,
			ticket,
		);
		return response.data;
	},
);

export const updateTicket = createAsyncThunk(
	'tickets/updateTicket',
	async ({ id, ticket }) => {
		const response = await axios.put(
			`${API_BASE_URL}/api/tickets/${id}`,
			ticket,
		);
		return response.data;
	},
);

export const deleteTicket = createAsyncThunk(
	'tickets/deleteTicket',
	async (id) => {
		await axios.delete(`${API_BASE_URL}/api/tickets/${id}`);
		return id;
	},
);

export const changeTicket = createAsyncThunk(
	'tickets/changeTicket',
	async ({
		currentNumber,
		newNumber,
		buyerName,
		buyerContact,
		buyerEmail,
	}) => {
		const response = await axios.post(`${API_BASE_URL}/api/tickets/change`, {
			currentNumber,
			newNumber,
			buyerName,
			buyerContact,
			buyerEmail,
		});
		return response.data;
	},
);

const ticketSlice = createSlice({
	name: 'tickets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTickets.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchTickets.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.tickets = action.payload;
			})
			.addCase(fetchTickets.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createTicket.fulfilled, (state, action) => {
				state.tickets.push(action.payload);
			})
			.addCase(updateTicket.fulfilled, (state, action) => {
				const index = state.tickets.findIndex(
					(ticket) => ticket.id === action.payload.id,
				);
				state.tickets[index] = action.payload;
			})
			.addCase(deleteTicket.fulfilled, (state, action) => {
				state.tickets = state.tickets.filter(
					(ticket) => ticket.id !== action.payload,
				);
			})
			.addCase(changeTicket.fulfilled, (state, action) => {
				const currentIndex = state.tickets.findIndex(
					(ticket) =>
						ticket.number ===
						action.payload.updatedCurrentTicket.number,
				);
				const newIndex = state.tickets.findIndex(
					(ticket) =>
						ticket.number ===
						action.payload.updatedNewTicket.number,
				);

				if (currentIndex !== -1) {
					state.tickets[currentIndex] = {
						...state.tickets[currentIndex],
						...action.payload.updatedCurrentTicket,
					};
				}
				if (newIndex !== -1) {
					state.tickets[newIndex] = {
						...state.tickets[newIndex],
						...action.payload.updatedNewTicket,
					};
				}
			});
	},
});

export default ticketSlice.reducer;
