import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminFormViewData.css';

const AdminFormViewData = ({ formId }) => {
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/promoter/fetchFormFilledData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ formId }),
                });

                const result = await response.json();
                if (response.ok) {
                    setFormData(result.data);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [formId]);

    return (
        <div className="form-view-data">
            <PageTitle title="View Data"></PageTitle>
            <div className="form-view-data-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Street Address</th>
                                <th>Street Address Line 2</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Pincode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.streetAddress}</td>
                                    <td>{item.streetAddressLine2}</td>
                                    <td>{item.city}</td>
                                    <td>{item.state}</td>
                                    <td>{item.pincode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminFormViewData;
