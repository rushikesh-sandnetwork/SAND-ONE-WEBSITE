import React, { useState } from 'react';
import axios from 'axios';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminCreateNewCampaign.css';

const AdminCreateNewCampaign = ({clientId}) => {
  const [title, setTitle] = useState('');
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
      console.log(clientId);
      const response = await axios.post('http://localhost:8080/api/v1/admin/createNewCampaign', { title, clientId });
      
      if (response.status === 201) {
        const newCampaign = response.data.data;
        setSuccess(`Campaign created successfully: ${newCampaign.title} (ID: ${newCampaign._id})`);
        setTitle('');
      }
    } catch (error) {
      setError('An error occurred while creating new campaign. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-new-campaign">
      <PageTitle title="Create New Campaign" />
      <div className="create-new-campaign-container">
        <h3 className="container-heading">Enter Campaign Details</h3>
        <form className='campaign-form' onSubmit={handleSubmit}>
          <div className="inputFields">
            <input
              type="text"
              className="input-field"
              placeholder="Campaign Title"
              value={title}
              onChange={handleInputChange(setTitle)}
              required
            />
           
          </div>

          <button type="submit" className="submit-campaign-button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default AdminCreateNewCampaign;
