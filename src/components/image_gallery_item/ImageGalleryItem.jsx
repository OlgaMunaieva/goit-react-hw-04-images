import '../styles.css';
// import { useState } from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, largeImage, isShowModal }) => {
  const createModal = () => {
    isShowModal(largeImage, alt);
  };

  // render() {
  //   const { src, alt } = this.props;

  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={src}
        alt={alt}
        onClick={createModal}
      />
    </li>
  );
  // }
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  isShowModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
