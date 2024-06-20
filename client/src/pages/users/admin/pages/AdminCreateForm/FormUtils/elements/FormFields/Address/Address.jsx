import React from 'react'
import './Address.css'
const Address = () => {
  return (
    <div className="address-container">
      <div className="address-title-container">
        <input type="text" className="address-container-title" placeholder='Address' />
      </div>

      <input type="text" className='street-address-input' name="" id="" />
      <h3>Street Address</h3>

      <input type="text" className='street-address-input-line2' name="" id="" />
      <h3>Street Address Line 2</h3>

      <div className="city-state">
        <div className="city-box">
          <input type="text" className='city-input' name="" id="" />
          <h3>City</h3>
        </div>

        <div className="state-box">
          <input type="text" className='state-input' name="" id="" />
          <h3>State/Province</h3>
        </div>
      </div>

      <input type="text" className='pincode-input' name="" id="" />
      <h3>Pincode/Zip Code</h3>
    </div>
  )
}

export default Address
