import React from 'react';
import './Modal.css';

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button className="modal-close-btn" onClick={onClose}>Next</button>
      </div>
    </div>
  );
};

export default Modal;
