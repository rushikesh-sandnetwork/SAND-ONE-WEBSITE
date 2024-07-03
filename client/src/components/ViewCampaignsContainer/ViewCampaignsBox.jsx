import React from 'react';
import './ViewCampaignsBox.css';

const ViewCampaignsBox = ({ campaign , campaignId,setActiveTab }) => {
  return (
    <div className="viewCampaignsBox">
      <h3>{campaign.title}</h3>
      <p>Created At: {new Date(campaign.createdAt).toLocaleString()}</p>
      <input
        type="button"
        value="More Details >"
        className="detailsBtn"
        onClick={()=>{
          setActiveTab(`campaignDetailsPage/${campaignId}`);
        }}
      />
    </div>
  );
};

export default ViewCampaignsBox;
