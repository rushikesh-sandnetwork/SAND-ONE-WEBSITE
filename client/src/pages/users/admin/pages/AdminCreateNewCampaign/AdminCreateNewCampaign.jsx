import React, { useState } from 'react';
import axios from 'axios';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminCreateNewCampaign.css';
import { useNavigate } from 'react-router-dom';

const AdminCreateNewCampaign = ({ clientId, setActiveTab }) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [campaignId, setId] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleNextClick = () => {
    navigate(`/admin/createNewForm/${campaignId}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('clientId', clientId);
      formData.append('campaignPhoto', event.target.campaignPhoto.files[0]);

      const response = await axios.post('http://localhost:8080/api/v1/admin/createNewCampaign', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        const newCampaign = response.data.data;
        setSuccess(`Campaign created successfully: ${newCampaign.title} (ID: ${newCampaign._id})`);
        setTitle('');
        setId(newCampaign._id);
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
            <input
              type="file"
              name="campaignPhoto"
              accept="image/*"
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="submit-campaign-button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        {success && <input type="button" value="Generate Form" className='submit-campaign-button' onClick={handleNextClick} />}
      </div>
    </div>
  );
};

export default AdminCreateNewCampaign;
