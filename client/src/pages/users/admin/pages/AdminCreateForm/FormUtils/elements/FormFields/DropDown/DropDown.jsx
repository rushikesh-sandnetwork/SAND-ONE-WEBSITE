import React from 'react';
import './DropDown.css';

const DropDown = () => {
  return (
    <div className="dropDown-container">
      <input type="text" className='dropDown-title' placeholder='Drop Down' />
      <div className="optionsContainer">
        <select className='dropDown-select'>
          <option value="" disabled selected>Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
        </select>
      </div>

    </div>
  );
}

export default DropDown;
