import PropTypes from 'prop-types';

const Message = ({ message }) =>
	message && <div className='text-center mt-4 text-green-600'>{message}</div>;

Message.propTypes = {
	message: PropTypes.string.isRequired,
};
export default Message;
