import '../styles.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ src, alt, onClick }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  function closeModal({ target, currentTarget, code }) {
    if (code === 'Escape' || target === currentTarget) {
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