import { Component } from 'react';
import fetchPhotosWithQuery from 'api/api';
import Searchbar from './search_bar/Searchbar';
import ImageGallery from './image_gallery/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';

export class App extends Component {
  state = {
    photos: [],
    query: '',
    page: 1,
    isLoading: false,
    error: null,
  };

  async uploadPhotos(query) {
    this.setState({ isLoading: true });

    try {
      const { totalHits, hits } = await fetchPhotosWithQuery(
        query,
        this.state.page
      );
      if (!totalHits) {
        throw new Error('No data');
      }

      this.setState(p => ({ photos: [...p.photos, ...hits] }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  getSearchQuery = searchQuery => {
    if (this.state.query !== searchQuery) {
      this.setState({ query: searchQuery, photos: [], page: 1 });
    }
  };

  nextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.uploadPhotos(this.state.query);
    }
  }

  render() {
    const { query, page, photos, isLoading } = this.state;
    const isShowGallery = photos.length > 0 && query;
    const isShowButton = isShowGallery && !isLoading && !(photos.length % 12);
    return (
      <>
        <Searchbar onSubmit={this.getSearchQuery} />
        {isShowGallery && <ImageGallery photos={photos} page={page} />}
        {isShowButton && <Button onClick={this.nextPage} />}
        {isLoading && <Loader />}
      </>
    );
  }
}
