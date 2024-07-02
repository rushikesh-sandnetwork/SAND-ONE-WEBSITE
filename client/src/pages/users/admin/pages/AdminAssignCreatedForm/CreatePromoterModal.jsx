import React, { useState } from 'react';
import axios from 'axios';
import './CreatePromoterModal.css'
const CreatePromoterModal = ({ onClose, onCreate }) => {
    const [promoterName, setPromoterName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [error, setError] = useState('');

    const handleCreatePromoter = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/promoter/registerNewPromoter', {
                promoterName,
                companyName,
            });

            if (response.status === 200) {
                alert('Promoter created successfully!');
                onCreate(response.data.data); // Pass created promoter data back to parent component
                onClose();
            } else {
                setError('Failed to create promoter.');
            }
        } catch (error) {
            setError('An error occurred while creating the promoter.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create New Promoter</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleCreatePromoter}>
                    <div className="form-group">
                        {/* <label htmlFor="promoterName">Promoter Name:</label> */}
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
                        {/* <label htmlFor="companyName">Company Name:</label> */}
                        <input
                            type="text"
                            id="companyName"
                            className='inputField'
                            placeholder='Company Name'
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="modal-close-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="modal-close-btn">
                            Create Promoter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePromoterModal;
