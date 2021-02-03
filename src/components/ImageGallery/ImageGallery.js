import { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';
import { fetchImages } from '../../services/pixabay-api';

class ImageGallery extends Component {
  state = {
    query: this.props.query,
    page: 1,
    images: [],
    isLoading: false,
    btnStatus: false,
    showModal: false,
    largeImageURL: '',
    imageAlt: '',
    error: null,
    imageStatus: 'loading',
  };
  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = prevProps;
    const { page: prevPage } = prevState;
    const { query } = this.props;
    const { page } = this.state;

    if (prevQuery !== query) {
      this.setState({ images: [], page: 1, query, isLoading: true, btnStatus: false });

      fetchImages(query, 1)
        .then(images => {
          this.setState({ images });
          if (images.length > 0) this.setState({ btnStatus: true });
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => {
          this.handleScroll();
          this.setState({ isLoading: false });
        });
      return;
    }

    if (prevPage !== page) {
      this.setState({ isLoading: true, btnStatus: false });
      if (prevQuery === query && page === 1) this.setState({ images: [] });
      fetchImages(query, page)
        .then(images => {
          const nextStateImages = [...this.state.images];
          nextStateImages.push(...images);
          this.setState({ images: nextStateImages, page });
          if (images.length > 0) this.setState({ btnStatus: true });
        })
        .catch(error => this.setState({ error }))
        .finally(() => {
          this.handleScroll();
          this.setState({ isLoading: false });
        });
      return;
    }
  }
  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  handleLoadNextPage = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  };
  handleSwitchModalStatus = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal, imageStatus: 'loading' }));
  };
  handleGetLargeImageURL = (largeImageURL, imageAlt) => {
    this.handleSwitchModalStatus();
    largeImageURL ? this.setState({ largeImageURL }) : this.setState({ largeImageURL: '' });
    imageAlt ? this.setState({ imageAlt }) : this.setState({ imageAlt: '' });
  };
  handleImageLoaded = () => {
    this.setState({ imageStatus: 'loaded' });
  };

  render() {
    const {
      images,
      isLoading,
      btnStatus,
      showModal,
      largeImageURL,
      imageAlt,
      error,
      imageStatus,
    } = this.state;
    return (
      <>
        {error && <h1>{error.message}</h1>}
        <ul className="ImageGallery">
          {images.map((el, index) => {
            const { webformatURL, tags, largeImageURL } = el;
            return (
              <ImageGalleryItem
                key={index}
                src={webformatURL}
                alt={tags}
                largeImageURL={largeImageURL}
                getLargeImageURL={this.handleGetLargeImageURL}
              />
            );
          })}
        </ul>
        {isLoading && (
          <Loader
            visible="true"
            type="Bars"
            color="#3f51b5"
            height={50}
            width={50}
            // timeout={3000} //3 secs
            className="loader"
          />
        )}
        {btnStatus && <Button onClick={this.handleLoadNextPage} />}
        {showModal && (
          <Modal onClose={this.handleSwitchModalStatus}>
            {imageStatus === 'loading' ? (
              <>
                <img src={largeImageURL} alt={imageAlt} onLoad={this.handleImageLoaded} />
                <Loader
                  visible="true"
                  type="ThreeDots"
                  color="#fff"
                  height={50}
                  width={50}
                  // timeout={3000} //3 secs
                  className="loaderModal"
                />
              </>
            ) : (
              <img src={largeImageURL} alt={imageAlt} />
            )}
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string,
};

export default ImageGallery;
