import PropTypes from 'prop-types';
import LoaderSpinner from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loader = ({ type = 'ThreeDots', color = '#000', className = 'loader' }) => {
  return (
    <LoaderSpinner
      visible="true"
      type={type}
      color={color}
      height={50}
      width={50}
      // timeout={3000} //3 secs
      className={className}
    />
  );
};

Loader.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Loader;
