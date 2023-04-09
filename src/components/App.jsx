import { useState } from 'react';
import fetchPhotosWithQuery from 'api/api';
import Searchbar from './search_bar/Searchbar';
import ImageGallery from './image_gallery/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSearchQuery = searchQuery => {
    if (query !== searchQuery) {
      setQuery(searchQuery);
      setPhotos([]);
      setPage(1);
      uploadPhotos(searchQuery, 1);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
    uploadPhotos(query, page + 1);
  };

  async function uploadPhotos(newQuery, newPage) {
    setIsLoading({ isLoading: true });

    if (newPage !== page || newQuery !== query) {
      try {
        const { totalHits, hits } = await fetchPhotosWithQuery(
          newQuery !== query ? newQuery : query,
          newPage !== page ? newPage : page
        );

        if (!totalHits) {
          throw new Error('No data');
        }
        if (newQuery !== query) {
          setPhotos(hits);
        } else {
          setPhotos([...photos, ...hits]);
        }
      } catch {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  }
  const isShowGallery = query && photos.length > 0;
  const isShowButton = isShowGallery && !isLoading && !(photos.length % 12);
  return (
    <>
      <Searchbar onSubmit={getSearchQuery} />
      {isShowGallery && <ImageGallery photos={photos} page={page} />}
      {isShowButton && <Button onClick={nextPage} />}
      {isLoading && <Loader />}
    </>
  );
};
