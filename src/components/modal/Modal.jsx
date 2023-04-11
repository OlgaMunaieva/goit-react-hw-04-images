import '../styles.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ src, alt, onClick }) => {
  useEffect(() => {
    const closeModal = ({ code }) => {
      if (code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [onClick]);

  function closeModal({ target, currentTarget }) {
    if (target === currentTarget) {
      onClick();
    }
  }

  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={src} alt={alt} width="800" height="600" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
