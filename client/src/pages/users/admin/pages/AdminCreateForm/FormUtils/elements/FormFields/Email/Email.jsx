import React from 'react'
import './Email.css'
const Email = () => {
  return (
    <div className="email-container">
      <input type="email" className="emailTitle" placeholder='Email'/>
      <input type="text" className="emailInput" />
    </div>
  )
}

export default Email
