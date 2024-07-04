import React from 'react'
import './FormBox.css'
const FormBox = ({formTitle , formId , setActiveTab}) => {
  return (
        <div className="formBox">
            <h3>{formTitle}</h3>
            <h4>{formId}</h4>
            <input type="button" className='detailsBtn' value="More Info" onClick={setActiveTab(`viewFormItems/${formId}`)} />
        </div>
  )
}

export default FormBox