import React, { useState } from 'react';
import axios from 'axios';
import './CreatePromoterModal.css';

const CreatePromoterModal = ({ onClose, onCreate }) => {
    const [promoterName, setPromoterName] = useState('');
    const [promoterEmailId, setPromoterEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleCreatePromoter = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('http://localhost:8080/api/v1/promoter/registerNewPromoter', {
                promoterName,
                promoterEmailId,
                password,
            });

            if (response.status === 200) {
                alert('Promoter created successfully!');
                onCreate(response.data); // Pass created promoter data back to parent component
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
