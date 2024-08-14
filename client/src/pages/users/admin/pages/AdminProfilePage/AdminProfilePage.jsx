import React from 'react'
import PageTitle from '../../../../../components/PageTitles/PageTitle'
import './AdminProfilePage.css';
const AdminProfilePage = () => {
    return (
        <div className="adminProfilePage-container">
            <PageTitle title="Profile" />
            <div className="profile-container">
                <h1 className='userDetailsTitle'>User Details : </h1>
            </div>
        </div>
    )
}

export default AdminProfilePage
