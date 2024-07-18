import React from 'react'
import PageTitle from '../../../../../components/PageTitles/PageTitle'
import './AdminProfilePage.css';
import DynamicTable from './TableData';
const AdminProfilePage = () => {
    return (
        <div className="adminProfilePage-container">
            <PageTitle title="Profile" />
            <div className="Profile-container">
                <DynamicTable></DynamicTable>
            </div>
        </div>
    )
}

export default AdminProfilePage
