// FullName.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDrag } from 'react-dnd';
import './FullName.css';
import { setFullNameData } from '../actions/fullNameActions'; // Updated action import

const FullName = ({ fullNameData, setFullNameData }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Dispatch action to save fullName data in JSON format to Redux store
      setFullNameData(event.target.value, 'Full Name'); // Pass the component name
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { type: 'Full Name', text: fullNameData.title || 'Full Name' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log('Full Name JSON:', JSON.stringify(fullNameData, null, 2));
  }, [fullNameData]);

  return (
    <div className="fullName-container" ref={dragRef}>
      <input
        type="text"
        name=""
        className='fullName-title'
        placeholder='Full Name'
        onKeyDown={handleKeyPress}
      />
      <div className="form-inputs">
        <div className="firstName">
          <input type="text" name="" className='firstName-input' id="" />
          <input type="text" name="" className='firstName-title' id="" placeholder='First Name' />
        </div>
        <div className="lastName">
          <input type="text" name="" className='lastName-input' id="" placeholder='' />
          <input type="text" name="" className='lastName-title' id="" placeholder='Last Name' />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fullNameData: state.fullName.fullNameData.length > 0 ? state.fullName.fullNameData[state.fullName.fullNameData.length - 1] : {},
});

const mapDispatchToProps = {
  setFullNameData,
};

export default connect(mapStateToProps, mapDispatchToProps)(FullName);
