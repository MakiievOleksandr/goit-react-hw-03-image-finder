import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/modules/ImageGalleryItem/ImageGalleryItem';

import scss from '../ImageGallery/imageGallery.module.scss';
const ImageGallery = ({ items, showImage }) => {
  return (
    <ul className={scss.imageGallery}>
      {items.length > 0 &&
        items.map(image => {
          return (
            <ImageGalleryItem
              image={image}
              key={image.id}
              showImage={showImage}
            />
          );
        })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
