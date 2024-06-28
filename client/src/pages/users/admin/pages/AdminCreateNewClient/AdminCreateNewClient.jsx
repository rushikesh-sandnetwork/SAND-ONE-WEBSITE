import React, { useState } from 'react';
import axios from 'axios';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminCreateNewClient.css';

const AdminCreateNewClient = () => {
  const [clientName, setClientName] = useState('');
  const [clientLocation, setClientLocation] = useState('');
  const [clientWebsite, setClientWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8080/api/v1/admin/createNewClient', { clientName, clientLocation, clientWebsite });
      if (response.status === 201) {
        const newClient = response.data.data;
        setSuccess(`Client created successfully: ${newClient.clientName} (ID: ${newClient._id})`);
        setClientName('');
        setClientLocation('');
        setClientWebsite('');
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
        <form  className='client-Form' onSubmit={handleSubmit}>
          <div className="inputFields">
            <input
              type="text"
              className="input-field"
              placeholder="Name of Client"
              value={clientName}
              onChange={handleInputChange(setClientName)}
              required
            />
            <input
              type="text"
              className="input-field"
              placeholder="Client Location"
              value={clientLocation}
              onChange={handleInputChange(setClientLocation)}
              required
            />
            <input
              type="text"
              className="input-field"
              placeholder="Client Website"
              value={clientWebsite}
              onChange={handleInputChange(setClientWebsite)}
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
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
