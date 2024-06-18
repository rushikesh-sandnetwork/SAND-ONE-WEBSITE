import React, { useState } from 'react';
import './AdminLandingPage.css';
import AdminOverViewPage from '../AdminOverViewPage/AdminOverViewPage';
import AdminCreateForms from '../AdminCreateForm/AdminCreateForms';
import AdminViewClientsPage from '../AdminViewClientsPage/AdminViewClientsPage';
import AdminProfilePage from '../AdminProfilePage/AdminProfilePage';
import AdminViewCampaignsPage from '../AdminViewCampaignsPage/AdminViewCampaignsPage'
const AdminLandingPage = () => {

  const [activeTab, setActiveTab] = useState('overview');


  return (
    <div className='LandingPage-container'>
      <div className='sidebar'>
        <div className="navbar">
          <img src="https://sandnetwork.in/wp-content/uploads/2024/02/sand-logo.png" alt="" />
          <a onClick={() => setActiveTab('overview')}>Overview</a>
          <a >New Client</a>
          <a onClick={() => setActiveTab('viewClients')}>View Clients</a>
          <a onClick={() => setActiveTab('profile')}>Profile</a>
          <input type="button" value="Logout" />
        </div>
      </div>
      <div className='content'>
        {activeTab == 'overview' && <AdminOverViewPage></AdminOverViewPage>}
        {activeTab == 'newClient' && <AdminCreateForms></AdminCreateForms>}
        {activeTab == 'viewClients' && <AdminViewClientsPage setActiveTab = {setActiveTab}></AdminViewClientsPage>}
        {activeTab == 'profile' && <AdminProfilePage></AdminProfilePage>}
        {activeTab == 'client-detail' && <AdminViewCampaignsPage ></AdminViewCampaignsPage>}
      </div>
    </div>
  );
}

export default AdminLandingPage;
