import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, largeImageURL, getLargeImageURL }) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => {
        getLargeImageURL(largeImageURL, alt);
      }}
    >
      <img src={src} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  largeImageURL: PropTypes.string,
  getLargeImageURL: PropTypes.func,
};

export default ImageGalleryItem;
