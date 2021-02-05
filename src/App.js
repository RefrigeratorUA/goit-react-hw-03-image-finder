import { Component } from 'react';
import { NotificationContainer } from './components/Notification';
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
        <NotificationContainer />
      </>
    );
  }
}
