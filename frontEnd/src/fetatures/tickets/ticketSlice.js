import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	tickets: [],
	status: 'idle',
	error: null,
};

// Thunks para las operaciones asíncronas
export const fetchTickets = createAsyncThunk(
	'tickets/fetchTickets',
	async () => {
		const response = await axios.get('/api/tickets');
		return response.data;
	},
);

export const createTicket = createAsyncThunk(
	'tickets/createTicket',
	async (ticket) => {
		const response = await axios.post('/api/tickets', ticket);
		return response.data;
	},
);

export const updateTicket = createAsyncThunk(
	'tickets/updateTicket',
	async ({ id, ticket }) => {
		const response = await axios.put(`/api/tickets/${id}`, ticket);
		return response.data;
	},
);

export const deleteTicket = createAsyncThunk(
	'tickets/deleteTicket',
	async (id) => {
		await axios.delete(`/api/tickets/${id}`);
		return id;
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
			});
	},
});

export default ticketSlice.reducer;
