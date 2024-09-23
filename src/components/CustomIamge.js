import React from "react";
import PropTypes from "prop-types";

const CustomImage = ({ src, alt, className = "", style = {} }) => {
  return (
    <div className={`image-container ${className}`} style={style}>
      <img
        src={src}
        alt={alt}
        className="img-fluid" // Use Bootstrap or your custom class
      />
    </div>
  );
};

CustomImage.propTypes = {
  src: PropTypes.string.isRequired,     // URL of the image
  alt: PropTypes.string.isRequired,     // Alt text for the image
  className: PropTypes.string,          // Custom CSS class for styling
  style: PropTypes.object               // Custom inline styles if needed
};

export default CustomImage;