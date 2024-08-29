import React from 'react';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import CampaignDetailsBox from '../../../../../components/CampaignDetailsBoxes/CampaignDetailsBox';
import './AdminCampaignDetailsPage.css';

const AdminCampaignDetailsPage = ({campaignId ,setActiveTab}) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete the campaign');
      }
      // Optionally, handle successful deletion (e.g., redirect or show a message)
      alert('Campaign deleted successfully');
      // You might want to redirect or refresh the page
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('An error occurred while deleting the campaign');
    }
  };
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
            url="view-all-forms"
            setActiveTab={setActiveTab}
            campaignId={campaignId}
          />
        </div>
      </div>
    </div>
    
  );
};

export default AdminCampaignDetailsPage;
