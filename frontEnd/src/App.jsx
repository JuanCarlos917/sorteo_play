import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Outlet,
} from 'react-router-dom';
import TicketManager from './adminDasboard/TicketManager';
import UserForm from './components/UserForm';
import Instructions from './components/Instructions';
import NotFound404 from './components/NotFound404';
import Footer from './components/Footer';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Root />}>
				<Route index element={<Home />} />
				<Route path='dashboard' element={<TicketManager />} />
				<Route path='*' element={<NotFound404 />} />
			</Route>,
		),
	);

	return (
		<>
			<RouterProvider router={router} />
			<Footer />
		</>
	);
}

const Root = () => {
	return (
		<>
			<Outlet />
		</>
	);
};

const Home = () => {
	return (
		<>
			<UserForm />
			<Instructions />
		</>
	);
};

export default App;
