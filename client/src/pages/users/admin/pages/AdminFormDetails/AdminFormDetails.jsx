import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminFormDetails.css';
import FormBox from '../../../../../components/FormBox/FormBox';

const AdminFormDetails = ({ campaignId }) => {
    const [formDetails, setFormDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFormDetails = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8080/api/v1/admin/fetchFormsForGivenClient',
                    { campaignId }
                );
                setFormDetails(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFormDetails();
    }, [campaignId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="form-details">
            <PageTitle title="Forms" />
            <div className="form-details-container">
                {formDetails.length > 0 ? (
                    formDetails.map((formDetail) => (
                        <FormBox formId={formDetail._id } formTitle={formDetail.collectionName} ></FormBox>

                        

                    ))
                ) : (
                    <div className="no-forms">NO FORMS</div>
                )}
            </div>
        </div>
    );
};

export default AdminFormDetails;
