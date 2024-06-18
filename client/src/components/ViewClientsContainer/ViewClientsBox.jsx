import React from 'react'
import './ViewClientsBox.css';
const ViewClientsBox = (props) => {
  return (
    <div className="viewClientsBox-container">
        <img src={props.imgSrc} alt="" className="clientImage" />
        <h3>{props.title}</h3>
        <input type="button" value="More Details >" className="detailsBtn" />
    </div>
  )
}

export default ViewClientsBox
