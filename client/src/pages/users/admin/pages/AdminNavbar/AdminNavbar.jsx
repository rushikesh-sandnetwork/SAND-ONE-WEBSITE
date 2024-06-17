import React from 'react';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <div className="navbar">
      <img src="https://sandnetwork.in/wp-content/uploads/2024/02/sand-logo.png" alt="" />
      <a href="#home">Overview</a>
      <a href="#newClient">New Client</a>
      <a href="#clients">View Clients</a>
      <a href="#contact">Profile</a>
      <input type="button" value="Logout" />
    </div>
  );
}

export default AdminNavbar;
