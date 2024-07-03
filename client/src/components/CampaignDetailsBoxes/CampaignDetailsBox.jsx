import React from 'react'
import './CampaignDetailsBox.css';
const CampaignDetailsBox = ({campaignId, title , url , imgSrc,setActiveTab}  ) => {
  return (
    <div className="campaign-detail-box">
        <div className="icon-box">
            <img src={imgSrc} alt="" />
        </div>
        <input type="button" className='detailsBtn' value={title} onClick={()=>{setActiveTab(`${url}/${campaignId}`)}}/>
    </div>
  )
}



// imgSrc="https://cdn-icons-png.flaticon.com/512/4074/4074958.png"
//             title="CREATE FORM"
//             url="create-form"
//             setActiveTab={setActiveTab}
//             campaignId={campaignId}
export default CampaignDetailsBox
