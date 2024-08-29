import React, { useState, useEffect } from 'react';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import axios from 'axios';
import './AdminAssignCreatedForm.css';
import { useParams } from 'react-router-dom';

const AdminAssignCreatedForm = () => {
    const [promoters, setPromoters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [promoterName, setPromoterName] = useState('');
    const [promoterEmailId, setPromoterEmailId] = useState('');
    const [password, setPassword] = useState('');

    const { formId } = useParams();

    const fetchPromoters = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/promoter/fetchPromoters');
            if (response.status === 200) {
                const promotersWithAssignment = response.data.data.map(promoter => ({
                    ...promoter,
                    hasFormAssigned: promoter.forms.includes(formId)
                }));
                setPromoters(promotersWithAssignment);
            } else {
                setError('Failed to fetch promoters.');
            }
        } catch (error) {
            setError('An error occurred while fetching promoters.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromoters();
    }, [formId]);

    const unassignFormFromPromoter = (promoterId) => {
        // Directly update the state to reflect the unassignment
        setPromoters(prevPromoters => (
            prevPromoters.map(promoter => {
                if (promoter._id === promoterId) {
                    return {
                        ...promoter,
                        hasFormAssigned: false
                    };
                }
                return promoter;
            })
        ));
    };
    

    const assignFormToPromoter = async (promoterId) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/admin/assignCreatedForms', {
                formId,
                promoterId,
            });

            if (response.status === 200) {
                alert('Form assigned successfully!');
                setPromoters(prevPromoters => (
                    prevPromoters.map(promoter => {
                        if (promoter._id === promoterId) {
                            return {
                                ...promoter,
                                hasFormAssigned: true
                            };
                        }
                        return promoter;
                    })
                ));
            } else {
                alert('Failed to assign form.');
            }
        } catch (error) {
            alert('An error occurred while assigning the form.');
        }
    };

    const handleCreatePromoter = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/promoter/registerNewPromoter', {
                promoterName,
                promoterEmailId,
                password,
            });
            if (response.status === 200) {
                alert('Promoter created successfully!');
                fetchPromoters();
                setPromoterName('');
                setPromoterEmailId('');
                setPassword('');
                setShowForm(false);
            } else {
                setError('Failed to create promoter.');
            }
        } catch (error) {
            setError('An error occurred while creating the promoter.');
        }
    };

    return (
        <div className="assignFormContainer">
            <div className="title">
                <PageTitle title="Assign Promoters" />
            </div>
            <div className="formDetails">
            <button className="back-btn" onClick={() => navigate('/admin')}>
                    Back
                </button>
                {loading ? (
                    <div className="loading">
                        <p>Loading...</p>
                    </div>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <table className="promoterTable">
                        <thead>
                            <tr>
                                <th>Promoter Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promoters.map((promoter) => (
                                <tr key={promoter._id}>
                                    <td>{promoter.promoterName}</td>
                                    <td>{promoter.promoterEmailId}</td>
                                    
                                        {promoter.hasFormAssigned ? (
                                            <span className="assigned">Assigned</span>
                                        ) : (
                                            <button
                                                className="assignFormBtn"
                                                onClick={() => assignFormToPromoter(promoter._id)}
                                            >
                                                Assign Form
                                            </button>
                                            </td>
                                        )}
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <button className="create-promoter-btn" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Create New Promoter'}
                </button>

                {showForm && (
                    <div className="promoter-form">
                        <form onSubmit={handleCreatePromoter}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="promoterName"
                                    className='inputField'
                                    placeholder='Promoter Name'
                                    value={promoterName}
                                    onChange={(e) => setPromoterName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    id="promoterEmailId"
                                    className='inputField'
                                    placeholder='Promoter Email'
                                    value={promoterEmailId}
                                    onChange={(e) => setPromoterEmailId(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    id="password"
                                    className='inputField'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="createPromotersubmit-btn">
                                    Create Promoter
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAssignCreatedForm;