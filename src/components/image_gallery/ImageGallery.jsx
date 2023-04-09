import ImageGalleryItem from 'components/image_gallery_item/ImageGalleryItem';
import '../styles.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'components/modal/Modal';

const ImageGallery = ({ photos, page }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [alt, setAlt] = useState('');

  const showModal = (largeImage, alt) => {
    setIsShowModal(true);
    setLargeImage(largeImage);
    setAlt(alt);
  };

  const hideModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      {isShowModal && <Modal src={largeImage} alt={alt} onClick={hideModal} />}
      <ul className="ImageGallery">
        {photos.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            alt={tags}
            largeImage={largeImageURL}
            isShowModal={showModal}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
};

export default ImageGallery;
