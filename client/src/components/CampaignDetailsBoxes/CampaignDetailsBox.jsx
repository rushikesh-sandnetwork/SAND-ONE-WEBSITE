import React from 'react'
import './CampaignDetailsBox.css';
const CampaignDetailsBox = (props) => {
  return (
    <div className="campaign-detail-box">
        <div className="icon-box">
            <img src={props.imgSrc} alt="" />
        </div>
        <input type="button" className='detailsBtn' value={props.title} />
    </div>
  )
}

export default CampaignDetailsBox
