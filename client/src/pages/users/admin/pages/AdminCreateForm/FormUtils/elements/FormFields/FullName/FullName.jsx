import React from 'react'
import './FullName.css'
const FullName = () => {
  return (
    <div className="fullName-container">
      <input type="text" name="" className='fullName-title' id="" placeholder='Full Name' />
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
  )
}

export default FullName
