import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

export default class App extends Component {
  state = {
    query: '',
  };

  handleQueryFromSearchbar = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleQueryFromSearchbar} />
        <ImageGallery query={query} />
        <ToastContainer />
      </>
    );
  }
}
