import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Outlet,
	useMatch,
} from 'react-router-dom';

// import { ProtectedRoute } from './components/ProtectedRoute';

import TicketManager from './adminDasboard/TicketManager';
import UserForm from './components/UserForm';
function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route
					path='/dashboard'
					element={
						<TicketManager />
						// <ProtectedRoute>
						// 	<TicketManager />
						// </ProtectedRoute>
					}
				/>
				<Route />
			</Route>,
		),
	);
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

const Root = () => {
	const match = useMatch('/dashboard/*');
	if (!match) {
		return (
			<>
				<UserForm />
			</>
		);
	} else {
		return (
			<>
				<Outlet />
			</>
		);
	}
};

export default App;
