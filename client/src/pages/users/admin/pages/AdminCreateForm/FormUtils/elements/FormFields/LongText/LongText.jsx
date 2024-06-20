import React from 'react'
import './LongText.css'
const LongText = () => {
  return (
    <div className="longText-container">
      <input type="text" className="longText-title" placeholder='Long Text'/>
      <textarea name="" className="longTextinput" id="" cols="50"></textarea>
      
    </div>
  )
}

export default LongText
