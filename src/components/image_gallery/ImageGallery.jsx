import ImageGalleryItem from 'components/image_gallery_item/ImageGalleryItem';
import '../styles.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
import Modal from 'components/modal/Modal';

class ImageGallery extends Component {
  static propTypes = {
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
    page: PropTypes.number.isRequired,
  };
  state = {
    isShowModal: false,
    largeImage: '',
    alt: '',
  };

  showModal = (largeImage, alt) => {
    this.setState({ isShowModal: true });
    this.setState({ largeImage: largeImage });
    this.setState({ alt: alt });
  };

  hideModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { isShowModal, largeImage, alt } = this.state;
    const { hideModal, showModal } = this;
    return (
      <>
        {isShowModal && (
          <Modal src={largeImage} alt={alt} onClick={hideModal} />
        )}
        <ul className="ImageGallery">
          {this.props.photos.map(
            ({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                src={webformatURL}
                alt={tags}
                largeImage={largeImageURL}
                isShowModal={showModal}
              />
            )
          )}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
