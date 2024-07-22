// src/features/tickets/ticketSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
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

export const deleteTicket = createAsyncThunk(
	'tickets/deleteTicket',
	async (id) => {
		await axios.delete(`${API_BASE_URL}/api/tickets/${id}`);
		return id;
	},
);

export const reserveTicket = createAsyncThunk(
	'tickets/reserveTicket',
	async ({ ticket_id, user_id }) => {
		const response = await axios.post(
			`${API_BASE_URL}/api/tickets/reserve`,
			{ ticket_id, user_id },
		);
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
			.addCase(deleteTicket.fulfilled, (state, action) => {
				state.tickets = state.tickets.filter(
					(ticket) => ticket.id !== action.payload,
				);
			})
			.addCase(reserveTicket.fulfilled, (state, action) => {
				const index = state.tickets.findIndex(
					(ticket) => ticket.id === action.payload.id,
				);
				if (index !== -1) {
					state.tickets[index] = action.payload;
				}
			});
	},
});

export const selectAllTickets = (state) => state.tickets.tickets;

export const selectSoldTickets = createSelector([selectAllTickets], (tickets) =>
	tickets.filter((ticket) => ticket.status === 'Vendida'),
);

export const selectReservedTickets = createSelector([selectAllTickets], (tickets) =>
	tickets.filter((ticket) => ticket.status === 'Reservado'),
);

export const selectAvailableTickets = createSelector([selectAllTickets], (tickets) =>
	tickets.filter((ticket) => ticket.status === 'Disponible'),
);

export default ticketSlice.reducer;
