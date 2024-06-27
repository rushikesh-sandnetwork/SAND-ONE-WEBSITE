import React, { useState } from 'react';
import axios from 'axios';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminCreateNewClient.css';

const AdminCreateNewClient = () => {
  const [clientName, setClientName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (event) => {
    setClientName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8080/api/v1/admin/createNewClient', { clientName });
      if (response.status === 201) {
        const newClient = response.data.data;
        setSuccess(`Client created successfully: ${newClient.clientName} (ID: ${newClient._id})`);
        setClientName('');
      }
    } catch (error) {
      setError('An error occurred while creating new client. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-new-client">
      <PageTitle title="Create New Client" />
      <div className="create-new-client-container">
        <h3 className="container-heading">Enter Client Details</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="nameContainer"
            placeholder="Name of Client"
            value={clientName}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="submitButton" disabled={loading}>
            {loading ? 'Creating...' : 'Create Client'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default AdminCreateNewClient;
