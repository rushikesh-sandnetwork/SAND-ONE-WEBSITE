import React, { useState, useEffect } from 'react';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import axios from 'axios';
import './AdminAssignCreatedForm.css';
import { useParams } from 'react-router-dom';
import CreatePromoterModal from './CreatePromoterModal';

const AdminAssignCreatedForm = () => {
    const [promoters, setPromoters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const { formId } = useParams(); // Fetch the formId from URL

    useEffect(() => {
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

        fetchPromoters();
    }, [formId]);

    const assignFormToPromoter = async (promoterId) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/admin/assignCreatedForms', {
                formId,
                promoterId,
            });

            if (response.status === 200) {
                alert('Form assigned successfully!');
                // Update local state to reflect the assignment
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

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCreatePromoter = (newPromoter) => {
        setPromoters(prevPromoters => [...prevPromoters, newPromoter]);
    };

    return (
        <div className="assignFormContainer">
            <div className="title">
                <PageTitle title="Assign Promoters" />
            </div>
            <div className="formDetails">
               

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <table className="promoterTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Promoter Name</th>
                                <th>Company Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promoters.map((promoter) => (
                                <tr key={promoter._id}>
                                    <td>{promoter._id}</td>
                                    <td>{promoter.promoterName}</td>
                                    <td>{promoter.companyName}</td>
                                    <td>
                                        {promoter.hasFormAssigned ? (
                                            <span>Assigned</span>
                                        ) : (
                                            <button
                                                className="assignFormBtn"
                                                onClick={() => assignFormToPromoter(promoter._id)}
                                            >
                                                Assign Form
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                
                <button className="create-promoter-btn" onClick={handleOpenModal}>
                    Create New Promoter
                </button>

             

                {showModal && (
                    <CreatePromoterModal
                        onClose={handleCloseModal}
                        onCreate={handleCreatePromoter}
                    />
                )}

            </div>
        </div>
    );
};

export default AdminAssignCreatedForm;