
const Footer = () => {
	return (
		<footer className='w-full text-center mt-8 p-4 bg-gray-800 text-gray-300'>
			<div className='space-y-4 md:space-y-0'>
				<small>&copy;{new Date().getFullYear()} | by Juan de Garzón</small>
			</div>
		</footer>
	);
};

export default Footer;
