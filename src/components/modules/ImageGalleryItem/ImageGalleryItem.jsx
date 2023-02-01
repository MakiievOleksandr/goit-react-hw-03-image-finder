import PropTypes from 'prop-types';

import scss from './imageGalleryItem.module.scss';

function ImageGalleryItem({ image, showImage }) {
  return (
    <li
      onClick={() => showImage(image.largeImageURL)}
      className={scss.imageGalleryItem}
      key={image.id}
    >
      <img
        className={scss.imageGalleryItem__image}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  showImage: PropTypes.func.isRequired,
};
