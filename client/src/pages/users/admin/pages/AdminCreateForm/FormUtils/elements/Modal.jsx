import React from 'react';
import './Modal.css';
import { useNavigate } from 'react-router-dom';

const Modal = ({ message, onClose, formId }) => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate(`/admin/createNestedForm/${formId}`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button className="modal-close-btn" onClick={handleNextClick}>Create Nested Form</button>
        <button className="modal-close-btn" onClick={onClose}>Next</button>
      </div>
    </div>
  );
};

export default Modal;
