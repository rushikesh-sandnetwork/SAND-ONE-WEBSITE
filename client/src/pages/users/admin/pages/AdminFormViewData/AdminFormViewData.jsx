import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook

import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminFormViewData.css';

const AdminFormViewData = () => {
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { formId } = useParams(); // Get formId from URL parameters

    const fetchData = async () => {
        setLoading(true);
        setError(null);
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

    useEffect(() => {
        fetchData();
    }, [formId]);

    const renderTableHeaders = () => {
        if (formData.length === 0) return null;
        const keys = Object.keys(formData[0]);
        const filteredKeys = keys.filter(key => key !== '_id');
        return filteredKeys.map((key) => <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>);
    };

    const renderTableRows = () => {
        return formData.map((item) => (
            <tr key={item._id}>
                {/* Render only values excluding the '_id' field */}
                {Object.keys(item)
                    .filter(key => key !== '_id')
                    .map((key) => (
                        <td key={key}>{item[key]}</td>
                    ))}
            </tr>
        ));
    };

    return (
        <div className="form-view-data">
            <div className="form-view-title-container">
                <PageTitle title="View Data"></PageTitle>
            </div>
            <div className="form-view-data-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                {renderTableHeaders()}
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRows()}
                        </tbody>
                    </table>
                )}
                <button onClick={fetchData} className="refresh-button">Refresh</button>
            </div>
        </div>
    );
};

export default AdminFormViewData;
