import React from 'react';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminViewCampaignPage.css';
import ViewCampaignsContainer from '../../../../../components/ViewCampaignsContainer/ViewCampaignsContainer';

const AdminViewCampaignsPage = ({ clientId, setActiveTab  }) => {
    return (
        <div className="adminViewCampaignsPage-container">
            <PageTitle title={`View Campaigns`} />
            <ViewCampaignsContainer clientId={clientId} setActiveTab={setActiveTab} />
        </div>
    );
}

export default AdminViewCampaignsPage;
