import React from 'react'
import "./OverViewTileTwo.css"
const OverViewTileTwoBox = (props) => {
  return (
    <div className="OverViewTileTwoBox-container">
        <h1 className='container-title'>{props.title}</h1>
        <p className='container-content'>{props.details}</p>
        <input className="moredetailsBtn" type="button" value="MORE DETAILS >" />
    </div>
  )
}

export default OverViewTileTwoBox
