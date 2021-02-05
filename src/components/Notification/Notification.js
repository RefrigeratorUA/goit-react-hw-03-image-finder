import PropTypes from 'prop-types';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContainer = ({ position = 'top-right', autoClose = 3000 }) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnHover={true}
      closeOnClick={true}
      draggable={true}
      progress={undefined}
      transition={Zoom}
      pauseOnFocusLoss
      rtl={false}
    />
  );
};

const showErrorNotification = (message, objSettings) => {
  toast.error(message, objSettings);
};

NotificationContainer.propTypes = {
  position: PropTypes.string,
  autoClose: PropTypes.number,
};

export { NotificationContainer, showErrorNotification };
