import React from 'react';
import './Image.css';

const Image = () => {
  return (
    <div className="imagePicker-container">
      <input type="text" className="imagePicker-title" placeholder="Enter Image Title" />
      <input type="image" className='imagePicker-input' id="imageUpload" />
      <label htmlFor="imageUpload" className="imagePicker-label">Choose an Image</label>
    </div>
  );
}

export default Image;
