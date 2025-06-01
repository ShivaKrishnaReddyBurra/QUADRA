import React from 'react';

const CustomImage = ({ src, alt, className = '', style = {} }) => {
  return (
    <div className={`relative w-full ${className}`} style={style}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-lg shadow-lg"
      />
    </div>
  );
};

export default CustomImage;