import React from 'react';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import CampaignDetailsBox from '../../../../../components/CampaignDetailsBoxes/CampaignDetailsBox';
import './AdminCampaignDetailsPage.css';

const AdminCampaignDetailsPage = ({campaignId ,setActiveTab}) => {
  return (
    <div className="campaign-details-container">
      <PageTitle title="Campaign Details" />
      <div className="campaign-details-boxes">

        <div className="row">
          <CampaignDetailsBox
            imgSrc="https://cdn-icons-png.flaticon.com/512/4074/4074958.png"
            title="CREATE FORM"
            url="create-form"
            setActiveTab={setActiveTab}
            campaignId={campaignId}
          />
          <CampaignDetailsBox
            imgSrc="https://cdn-icons-png.flaticon.com/512/9316/9316720.png"
            title="VIEW FORMS"
            url="view-form-details"
            setActiveTab={setActiveTab}
            campaignId={campaignId}
          />
          {/* <CampaignDetailsBox
            imgSrc="https://cdn-icons-png.flaticon.com/512/694/694642.png"
            title="VIEW PROMOTERS"
          /> */}
        </div>
        {/* <div className="row">
          <CampaignDetailsBox
            imgSrc="https://cdn-icons-png.flaticon.com/512/3144/3144438.png"
            title="VIEW DATA"
            url="view-data"
          />
          <CampaignDetailsBox
            imgSrc="https://cdn-icons-png.flaticon.com/512/3388/3388538.png"
            title="ACCEPTED DATA"
          />
          <CampaignDetailsBox
            imgSrc="https://cdn-icons-png.flaticon.com/512/8867/8867452.png"
            title="REJECTED DATA"
          />
        </div> */}
      </div>
    </div>
  );
};

export default AdminCampaignDetailsPage;
