import React, { useState } from 'react';
import axios from 'axios';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminCreateNewUser.css';

const AdminCreateNewUser = () => {
  const [name, setname] = useState('');
  const [surname, setsurname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState(''); // New state for client photo
  const [role, setrole] = useState('');
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

    // if (!clientPhoto) {
    //   setError('Please upload Client Photo');
    //   setLoading(false);
    //   return;
    // }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role',role);

    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/createUser', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        const newUser = response.data.data;
        setSuccess(`User created successfully with the role ${newUser.role}`);
        // setSuccess(`Client created successfully: ${newClient.clientName} (ID: ${newClient._id})`);
        setname('');
        setsurname('');
        setemail('');
        setpassword('');
        setrole('');
        
      
      }
    } catch (error) {
      setError('An error occurred while creating new user. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-new-client">
      <PageTitle title="Create New User" />
      <div className="create-new-client-container">
        <h3 className="container-heading">Enter User Details</h3>
        <form className='client-Form' onSubmit={handleSubmit}>
          <div className="inputFields">
            <input
              type="text"
              className="input-field"
              placeholder="Name of User"
              value={name}
              onChange={handleInputChange(setname)}
              required
            />
            <input
              type="text"
              className="input-field"
              placeholder="Surname of User"
              value={surname}
              onChange={handleInputChange(setsurname)}
              required
            />
            <input
              type="text"
              className="input-field"
              placeholder="Email of User"
              value={email}
              onChange={handleInputChange(setemail)}
              required
            />
            
          </div>
          <div className="inputFields">
            <input
              type="text"
              className="input-field"
              placeholder="Password of User"
              value={password}
              onChange={handleInputChange(setpassword)}
              required
            />
             <input
              type="text"
              className="input-field"
              placeholder="Role of User"
              value={role}
              onChange={handleInputChange(setrole)}
              required
            />
          </div>
       
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default AdminCreateNewUser;
