import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewClientsContainer.css';
import ViewClientsBox from './ViewClientsBox';

const ViewClientsContainer = ({ setActiveTab }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/admin/fetchAllClient');
        setClients(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError('Failed to load clients');
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="ViewClientsContainer">
      {clients.map((client, index) => (
        <ViewClientsBox
          key={index}
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png"
          clientName={client["clientName"]}
          clientId={client["_id"]}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
};

export default ViewClientsContainer;
