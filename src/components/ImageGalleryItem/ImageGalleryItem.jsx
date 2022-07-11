import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ large, small, alt, onClick }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={() => onClick(large)}>
      <img src={small} className={s.ImageGalleryItemImage} alt={alt} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  large: PropTypes.string.isRequired,
  small: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
