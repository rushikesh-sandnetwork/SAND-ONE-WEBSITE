import React from 'react'
import './FormDetailsBox.css'
import { useNavigate } from 'react-router-dom';

const FormDetailsBox = ({ formId, title, imgSrc, url, setActiveTab  }) => {

  const navigate = useNavigate();


  const handleNextClick = () => {
      navigate(`/admin/${url}/${formId}`);
  };




  return (
    <div className='form-detail-box'>
      <div className="icon-box">
        <img src={imgSrc} alt="" />
      </div>
      <input type="button" className='detailsBtn' value={title} onClick={handleNextClick} />
    </div>
  )
}

export default FormDetailsBox
