import React from 'react'
import './ShortText.css'
const ShortText = () => {
  return (
    <div className="shortText-container">
      <input type="text" placeholder="Enter the text" className="shortText-title" />

      <input type="text"  className="shortText-input" />
    </div>
  )
}

export default ShortText
