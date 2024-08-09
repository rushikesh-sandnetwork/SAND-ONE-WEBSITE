import React, { useState } from 'react';
import AdminOverViewPage from '../AdminOverViewPage/AdminOverViewPage';
import AdminViewClientsPage from '../AdminViewClientsPage/AdminViewClientsPage';
import AdminProfilePage from '../AdminProfilePage/AdminProfilePage';
import AdminViewCampaignsPage from '../AdminViewCampaignsPage/AdminViewCampaignsPage';
import AdminCreateNewClient from '../AdminCreateNewClient/AdminCreateNewClient';
import AdminCampaignDetailsPage from '../AdminCampaignDetailsPage/AdminCampaignDetailsPage';
import AdminFormDetails from '../AdminFormDetails/AdminFormDetails';
import './AdminLandingPage.css';
import AdminCreateNewCampaign from '../AdminCreateNewCampaign/AdminCreateNewCampaign';
import AdminFormItems from '../AdminFormItems/AdminFormItems';

const AdminLandingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeClient, setActiveClient] = useState('');

  const tabName = activeTab.startsWith('client-detail') ? activeTab.substring('client-detail'.length + 1) : activeTab;
  const tabName2 = activeTab.startsWith('createNewCampaign') ? activeTab.substring('createNewCampaign'.length + 1) : activeTab;
  const tabName3 = activeTab.startsWith('campaignDetailsPage') ? activeTab.substring('campaignDetailsPage'.length + 1) : activeTab;
  const tabName4 = activeTab.startsWith('view-all-forms') ? activeTab.substring('view-all-forms'.length + 1) : activeTab;
  const tabName5 = activeTab.startsWith('viewFormData') ? activeTab.substring('viewFormData'.length + 1) : activeTab;
  // const tabName6 = activeTab.startsWith('viewFormData') ? activeTab.substring('viewFormData'.length + 1) : activeTab;

  return (
    <div className='LandingPage-container'>
      <div className='sidebar'>
        <div className="navbar">
          <img src="./src/pages/users/admin/utils/SAND 1 logo.png" alt="" />
          <a onClick={() => setActiveTab('overview')}>Overview</a>
          <a onClick={() => setActiveTab('newClient')}>New Client</a>
          <a onClick={() => setActiveTab('viewClients')}>View Clients</a>
          <a onClick={() => setActiveTab('profile')}>Profile</a>
          <input type="button" value="Logout" />
        </div>
      </div>
      <div className='content'>
        {activeTab === 'overview' && <AdminOverViewPage />}
        {activeTab === 'newClient' && <AdminCreateNewClient />}
        {activeTab === 'viewClients' && (
          <AdminViewClientsPage setActiveTab={setActiveTab} setActiveClient={setActiveClient} />
        )}
        {activeTab === 'profile' && <AdminProfilePage />}
        {activeTab.startsWith('client-detail') && (
          <AdminViewCampaignsPage clientId={tabName} setActiveTab={setActiveTab} />
        )}
        {activeTab.startsWith('createNewCampaign') && (
          <AdminCreateNewCampaign clientId={tabName2} setActiveTab={setActiveTab} />
        )}
        {activeTab.startsWith('campaignDetailsPage') && (
          <AdminCampaignDetailsPage campaignId={tabName3} setActiveTab={setActiveTab} />
        )}
        {activeTab.startsWith('view-all-forms') && (
          <AdminFormDetails campaignId={tabName4} setActiveTab={setActiveTab}></AdminFormDetails>
        )}

        {activeTab.startsWith('viewFormData') && (
          <AdminFormItems formId={tabName5} setActiveTab={setActiveTab}></AdminFormItems>
        )}


      </div>
    </div>
  );
};

export default AdminLandingPage;
