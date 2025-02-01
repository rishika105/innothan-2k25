
import PropTypes from 'prop-types';

const Notification = ({ onAccept }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg text-center">
      <p>🚨 Traffic Jam Ahead! Take the alternate route.</p>
      <button
        onClick={onAccept}
        className="mt-2 bg-white text-red-500 px-4 py-1 rounded"
      >
        View Alternate Route
      </button>
    </div>
  );
};

Notification.propTypes = {
  onAccept: PropTypes.func.isRequired,
};


export default Notification;