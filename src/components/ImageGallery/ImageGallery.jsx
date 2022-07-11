import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <>
      <ul className={s.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, alt }) => (
          <ImageGalleryItem
            onClick={onClick}
            key={id}
            small={webformatURL}
            large={largeImageURL}
            alt={alt}
          />
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  imeges: PropTypes.array,
};
