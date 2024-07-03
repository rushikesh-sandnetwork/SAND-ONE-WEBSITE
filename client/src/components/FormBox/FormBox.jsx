import React from 'react'

const FormBox = ({formTitle , formId}) => {
  return (
        <div className="formBox">
            <h3>{formTitle}</h3>
            <h4>{formId}</h4>
            <input type="button" className='detailsBtn' value="More Info" />
        </div>
  )
}

export default FormBox
