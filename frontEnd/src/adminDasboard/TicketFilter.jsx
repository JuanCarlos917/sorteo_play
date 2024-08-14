import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

const TicketFilter = ({ filterText, onFilterTextChange, onSearch }) => {
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			onSearch();
		}
	};

	return (
		<div className='max-w-md mx-auto mb-4'>
			<div className='relative'>
				<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
					<SearchIcon />
				</div>
				<input
					type='search'
					id='default-search'
					className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500'
					placeholder='Search Tickets...'
					value={filterText}
					onChange={(e) => onFilterTextChange(e.target.value)}
					onKeyDown={handleKeyDown}
					required
				/>
				<button
					type='button'
					className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2'
					onClick={onSearch}
				>
					Search
				</button>
			</div>
		</div>
	);
};

TicketFilter.propTypes = {
	filterText: PropTypes.string.isRequired,
	onFilterTextChange: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
};

export default TicketFilter;
