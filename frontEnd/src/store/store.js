import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from '../fetatures/tickets/ticketSlice';

export const store = configureStore({
	reducer: {
		tickets: ticketReducer,
	},
});
