import React from 'react';
import './AdminLandingPage.css';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import PageTitle from '../../../../../components/PageTitles/PageTitle';

const AdminLandingPage = () => {
  return (
    <div className='LandingPage-container'>
      <div className='sidebar'>
        <AdminNavbar />
      </div>
      <div className='content'>
        <PageTitle title="Overview" />
        {/* Add other content components as needed */}
      </div>
    </div>
  );
}

export default AdminLandingPage;
