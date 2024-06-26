import React from 'react'
import PageTitle from '../../../../../components/PageTitles/PageTitle'
import './AdminCreateNewClient.css';
const AdminCreateNewClient = () => {
  return (  
    <div className="create-new-client">
      <PageTitle title="Create New Client"></PageTitle>
      <div className="create-new-Client-container">
        <h3 className="container-heading">Enter Client Details</h3>
        <input type="text" name="" className='nameContainer' id="" placeholder='Name of Client' />
      </div>
    </div>
  )
}

export default AdminCreateNewClient