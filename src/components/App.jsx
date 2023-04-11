import { useEffect, useState } from 'react';
import { fetchPhotosWithQuery, PER_PAGE } from 'api/api';
import Searchbar from './search_bar/Searchbar';
import ImageGallery from './image_gallery/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('No Data');

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    fetchPhotosWithQuery(query, page)
      .then(({ totalHits, hits }) => {
        if (!totalHits) {
          throw new Error(error);
        }
        setPhotos(prevPhotos => [...prevPhotos, ...hits]);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [query, page, error]);

  const getSearchQuery = searchQuery => {
    if (query !== searchQuery) {
      setQuery(searchQuery);
      setPhotos([]);
      setPage(1);
    }
  };

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const isShowGallery = query && photos.length > 0;
  const isShowButton =
    isShowGallery && !isLoading && !(photos.length % PER_PAGE);
  return (
    <>
      <Searchbar onSubmit={getSearchQuery} />
      {isShowGallery && <ImageGallery photos={photos} page={page} />}
      {isShowButton && <Button onClick={nextPage} />}
      {isLoading && <Loader />}
    </>
  );
};
