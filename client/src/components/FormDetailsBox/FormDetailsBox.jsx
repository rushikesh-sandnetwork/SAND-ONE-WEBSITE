import React from 'react'
import './FormDetailsBox.css'
const FormDetailsBox = ({ formId, title, imgSrc, url, setActiveTab  }) => {
  return (
    <div className='form-detail-box'>
      <div className="icon-box">
        <img src={imgSrc} alt="" />
      </div>
      <input type="button" className='detailsBtn' value={title} onClick={() => { setActiveTab(`${url}/${formId}`)}} />
    </div>
  )
}

export default FormDetailsBox
