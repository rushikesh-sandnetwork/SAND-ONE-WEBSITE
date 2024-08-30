import React from 'react';
import './CampaignDetailsBox.css';
import { useNavigate } from 'react-router-dom';

const CampaignDetailsBox = ({ campaignId, title, url, imgSrc, setActiveTab }) => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (url == "create-form") {
      navigate(`/admin/createNewForm/${campaignId}`);

    } else {
      setActiveTab(`${url}/${campaignId}`)
    }
  };

  return (
    <div className="campaign-detail-box">
      <div className="icon-box">
        <img src={imgSrc} alt="" />
      </div>
      <input
        type="button"
        className="detailsBtn"
        value={title}
        onClick={handleNextClick}
      />
    </div>
  );
}

export default CampaignDetailsBox;