import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Outlet,
} from 'react-router-dom';
import './App.css'

import NavbarAdmin from './adminDasboard/NavbarAdmin';
import AddTicketForm from './adminDasboard/AddTicketForm';
import CreateTransaction from './adminDasboard/CreateTransaction';
import UserList from './adminDasboard/UserList';
import TransactionList from './adminDasboard/TransactionList';
import TicketManager from './adminDasboard/TicketManager';
import Statistics from './adminDasboard/Statistics';
import UserForm from './components/UserForm';
import Instructions from './components/Instructions';
import NotFound404 from './components/NotFound404';
import Footer from './components/Footer';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<Home />} />
				<Route path='dashboard' element={<NavbarAdmin />}>
					<Route index element={<TicketManager />} />
					<Route path='add-tickets' element={<AddTicketForm />} />
					<Route
						path='create-transactions'
						element={<CreateTransaction />}
					/>
					<Route path='clients' element={<UserList />} />
					<Route path='sales-list' element={<TransactionList />} />
					<Route path='stadistics-sales' element={<Statistics />} />
				</Route>
				<Route path='*' element={<NotFound404 />} />
			</Route>,
		),
	);

	return (
		<div className='App'>
			<RouterProvider router={router} />
			<Footer />
		</div>
	);
}

const Root = () => {
	return (
		<div className='content'>
			<Outlet />
		</div>
	);
};

const Home = () => {
	return (
		<div className='content'>
			<UserForm />
			<Instructions />
		</div>
	);
};

export default App;
