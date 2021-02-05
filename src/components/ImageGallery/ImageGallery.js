import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Loader from '../Loader';
import Modal from '../Modal';
import { fetchImages } from '../../services/pixabay-api';

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string,
  };

  state = {
    query: this.props.query,
    page: 1,
    images: [],
    error: null,
    isLoading: false,
    btnStatus: false,
    showModal: false,
    imageLoading: false,
    largeImageURL: '',
    imageAlt: '',
  };
  async componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = prevProps;
    const { query } = this.props;

    if (prevQuery !== query) {
      await this.setState({
        images: [],
        page: 1,
        query,
        isLoading: true,
        btnStatus: false,
        error: null,
      });
      await this.setGallery();
    }
  }

  setGallery = () => {
    const { query, page } = this.state;
    fetchImages(query, page)
      .then(images => {
        this.setState({ images: [...this.state.images, ...images] });
        if (images.length > 0) this.setState({ btnStatus: true });
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => {
        this.handleScroll();
        this.setState({ isLoading: false });
      });
  };

  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleLoadNextPage = async () => {
    const nextPage = this.state.page + 1;
    await this.setState({ page: nextPage, isLoading: true, btnStatus: false, error: null });
    await this.setGallery();
  };

  handleSwitchModalStatus = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal, imageLoading: true }));
  };
  handleGetLargeImageURL = (largeImageURL, imageAlt) => {
    this.handleSwitchModalStatus();
    largeImageURL ? this.setState({ largeImageURL }) : this.setState({ largeImageURL: '' });
    imageAlt ? this.setState({ imageAlt }) : this.setState({ imageAlt: '' });
  };
  handleSwitchImageLoading = () => {
    this.setState(({ imageLoading }) => ({ imageLoading: false }));
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
      imageLoading,
    } = this.state;
    return (
      <>
        {error ? (
          <h1>{error.message}</h1>
        ) : (
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
        )}
        {isLoading && <Loader type="Bars" color="#3f51b5" className="loader" />}
        {/* btnStatus оставил, т.к. если рендерить Button по условию (!isLoading & this.state.image.length>0) 
        получится, что после того, как бекенд отдаст все картинки по запросу this.state.image.length будет больше 0 
        и кнопка будет отображаться. При этом на бекенде картинок уже нет */}
        {btnStatus && <Button onClick={this.handleLoadNextPage} />}
        {showModal && (
          <Modal onClose={this.handleSwitchModalStatus}>
            <>
              {imageLoading && <Loader type="ThreeDots" color="#fff" className="loaderModal" />}
              <img src={largeImageURL} alt={imageAlt} onLoad={this.handleSwitchImageLoading} />
            </>
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
