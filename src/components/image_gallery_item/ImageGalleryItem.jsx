import '../styles.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    isShowModal: PropTypes.func.isRequired,
  };
  static defaultProps = {
    src: '',
    alt: '',
    largeImage: '',
  };

  createModal = () => {
    const { largeImage, alt } = this.props;
    this.props.isShowModal(largeImage, alt);
  };

  render() {
    const { src, alt } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={src}
          alt={alt}
          onClick={this.createModal}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
