import React from 'react'
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminViewClientsPage.css'
import ViewClientsContainer from '../../../../../components/ViewClientsContainer/ViewClientsContainer';
const AdminViewClientsPage = () => {
  return (
    <div className="adminViewClientsPage-container">
            <PageTitle title="View Clients" />
            <ViewClientsContainer></ViewClientsContainer>
    </div>
  )
}

export default AdminViewClientsPage
