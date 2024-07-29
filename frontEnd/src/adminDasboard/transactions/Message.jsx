import PropTypes from 'prop-types';

const Message = ({ message, type }) => {
	const messageStyle = type === 'error' ? 'text-red-600' : 'text-green-600';
	return (
		message && (
			<div className={`text-center mt-4 ${messageStyle}`}>{message}</div>
		)
	);
};

Message.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default Message;
