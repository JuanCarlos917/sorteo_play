import { configureStore } from '@reduxjs/toolkit';
import ticketSlice from '../features/tickets/ticketSlice';
import userSlice from '../features/users/userSlice';
import transactionSlice from '../features/transactions/transactionSlice';

export const store = configureStore({
	reducer: {
		tickets: ticketSlice,
		users: userSlice,
        transactions : transactionSlice
	},
});
