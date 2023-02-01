import PropTypes from 'prop-types';

import scss from './image-details.module.scss';

const ImageDetails = ({ details }) => {
  return (
    <div>
      <img className={scss.picture} src={details} alt="{tags}" />
    </div>
  );
};
export default ImageDetails;

ImageDetails.propTypes = {
  details: PropTypes.string.isRequired,
};
