import React from 'react';
import './ViewClientsBox.css';

const ViewClientsBox = ({ imgSrc, title, setActiveTab }) => {
  return (
    <div className="viewClientsBox-container">
      <img src={imgSrc} alt="" className="clientImage" />
      <h3>{title}</h3>
      <input type="button" value="More Details >" className="detailsBtn" onClick={() => setActiveTab('client-detail')} />
    </div>
  )
}

export default ViewClientsBox;
