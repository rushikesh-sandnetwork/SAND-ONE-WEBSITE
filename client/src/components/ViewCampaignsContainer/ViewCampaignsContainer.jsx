import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewCampaignsContainer.css';
import ViewCampaignsBox from './ViewCampaignsBox';

const ViewCampaignsContainer = ({ clientId, setActiveTab }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/admin/fetchAllCampaigns', { clientId });
        // Reverse the order of campaigns array
        setCampaigns(response.data.data.reverse());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setError('Failed to load campaigns');
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [clientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="viewCampaignsContainer">
      <input
        className='newCampaignBtn'
        type="button"
        value="Create New Campaign +"
        onClick={() => setActiveTab(`createNewCampaign/${clientId}`)}
      />

      <div className="allCampaignsContainer">
        {campaigns.map(campaign => (
          <ViewCampaignsBox key={campaign._id} url={campaign.campaignLogo} campaign={campaign} campaignId={campaign._id} setActiveTab= {setActiveTab}/>
        ))}
      </div>
    </div>
  );
};

export default ViewCampaignsContainer;
