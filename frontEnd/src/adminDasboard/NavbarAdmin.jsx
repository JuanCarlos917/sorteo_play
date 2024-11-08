import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navigation = [
	{ name: ' Ticket Manager', href: '/admin-user', current: false },
	{
		name: 'Statistics',
		href: '/admin-user/stadistics-sales',
		current: false,
	},
	{
		name: 'Create Transactions',
		href: '/admin-user/create-transactions',
		current: false,
	},
	{ name: 'Clients', href: '/admin-user/clients', current: false },
	{ name: 'Sales List', href: '/admin-user/sales-list', current: false },
	{ name: 'Add Tickets', href: '/admin-user/add-tickets', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function NavbarAdmin() {
    const location = useLocation();

    return (
		<>
			<Disclosure
				as='nav'
				className='bg-gray-800 fixed w-full top-0 z-50'>
				{({ open }) => (
					<>
						<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
							<div className='relative flex h-16 items-center justify-between'>
								<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
									{/* Mobile menu button */}
									<Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
										<span className='absolute -inset-0.5' />
										<span className='sr-only'>
											Open main menu
										</span>
										{open ? (
											<XMarkIcon
												className='block h-6 w-6'
												aria-hidden='true'
											/>
										) : (
											<Bars3Icon
												className='block h-6 w-6'
												aria-hidden='true'
											/>
										)}
									</Disclosure.Button>
								</div>
								<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
									<div className='flex flex-shrink-0 items-center'>
										<img
											className='h-8 w-auto'
											src='https://res.cloudinary.com/dcqkvu95d/image/upload/v1730666215/regalo_nl5dlw.png'
											alt='sorteo PS5'
										/>
									</div>
									<div className='hidden sm:ml-6 sm:block'>
										<div className='flex space-x-4'>
											{navigation.map((item) => (
												<Link
													key={item.name}
													to={item.href}
													className={classNames(
														location.pathname ===
															item.href
															? 'bg-gray-900 text-white'
															: 'text-gray-300 hover:bg-gray-700 hover:text-white',
														'rounded-md px-3 py-2 text-sm font-medium',
													)}>
													{item.name}
												</Link>
											))}
										</div>
									</div>
								</div>
								<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
									<button
										type='button'
										className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
										<span className='absolute -inset-1.5' />
										<span className='sr-only'>
											View notifications
										</span>
										<BellIcon
											className='h-6 w-6'
											aria-hidden='true'
										/>
									</button>

									{/* Profile dropdown */}
									<Menu as='div' className='relative ml-3'>
										<div>
											<Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
												<span className='absolute -inset-1.5' />
												<span className='sr-only'>
													Open user menu
												</span>
												<img
													className='h-8 w-8 rounded-full'
													src='https://res.cloudinary.com/dcqkvu95d/image/upload/v1721511365/Descargar_icono_de_perfil_de_usuario_gratis_dgyhmm.jpg'
													alt='perfil'
												/>
											</Menu.Button>
										</div>
										<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
											<Menu.Item>
												{({ active }) => (
													<a
														href='#'
														className={classNames(
															active
																? 'bg-gray-100'
																: '',
															'block px-4 py-2 text-sm text-gray-700',
														)}>
														Your Profile
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href='#'
														className={classNames(
															active
																? 'bg-gray-100'
																: '',
															'block px-4 py-2 text-sm text-gray-700',
														)}>
														Settings
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href='#'
														className={classNames(
															active
																? 'bg-gray-100'
																: '',
															'block px-4 py-2 text-sm text-gray-700',
														)}>
														Sign out
													</a>
												)}
											</Menu.Item>
										</Menu.Items>
									</Menu>
								</div>
							</div>
						</div>

						<Disclosure.Panel className='sm:hidden'>
							<div className='space-y-1 px-2 pb-3 pt-2'>
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as={Link}
										to={item.href}
										className={classNames(
											location.pathname === item.href
												? 'bg-gray-900 text-white'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'block rounded-md px-3 py-2 text-base font-medium',
										)}>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			<Outlet />
		</>
	);
}