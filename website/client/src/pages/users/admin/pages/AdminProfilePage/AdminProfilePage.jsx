import React, { useState, useEffect } from 'react';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminProfilePage.css';

const AdminProfilePage = ({ userId }) => {  // Updated to accept userId as a prop
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('https://sand-one-website.onrender.com/api/v1/user/userDetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })  // Send userId in the request body
                });

                const data = await response.json();
                if (response.ok) {
                    setUserDetails(data.data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError("An error occurred while fetching user details.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);  // Ensure userId is a dependency for useEffect

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="adminProfilePage-container">
            <PageTitle title="Profile" />
            <div className="Profile-container">
                <DynamicTable></DynamicTable>
            </div>
        </div>
    );
};

export default AdminProfilePage;
