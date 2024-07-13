import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import DraggableItem from './DraggableItem';
import './DropArea.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from './Modal';

const DropArea = ({ onDrop }) => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [droppedItemNames, setDroppedItemNames] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formId, setFormId] = useState('');

  const { campaignId } = useParams();
  const navigate = useNavigate();

  const fullNameDataList = useSelector((state) => state.fullName.fullNameDataList);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'item',
    drop: (item) => {
      onDrop(item);
      setDroppedItems((prevItems) => [...prevItems, item]);
      setDroppedItemNames((prevNames) => [...prevNames, item.text]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleDelete = (id) => {
    setDroppedItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setDroppedItemNames((prevNames) =>
      prevNames.filter((name, index) => droppedItems[index].id !== id)
    );
  };

  function arrayToFormFields(array) {
    return array.map((item, index) => ({ id: index + 1, value: item }));
  }

  const handleSubmitForm = async () => {
    try {
      const formFieldsArray = arrayToFormFields(droppedItemNames);
      const formData = {
        campaignId,
        formFields: formFieldsArray,
      };

      console.log('Full Name JSON from store:', JSON.stringify(fullNameDataList, null, 2));

      const response = await axios.post('http://localhost:8080/api/v1/admin/createNewForm', formData);
      if (response.status === 201) {
        setSuccessMessage('Form submitted successfully!');
        setShowModal(true);
        setFormId(response.data.data._id); // Ensure you access the correct path in response
      } else {
        console.error('Failed to submit form:', response.data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage('');
    navigate(`/admin/assignForm/${formId}`); // Ensure navigate is used correctly
  };

  return (
    <div className='drop-area-container'>
      <div className='drop-area' ref={dropRef}>
        <div className="drop-area-title">
          <p>Create Form Here</p>
          <input
            type="button"
            className="create-form-btn"
            value="Submit Form"
            onClick={handleSubmitForm}
          />
        </div>
        <div className='dropped-Item'>
          {droppedItems.map((item, index) => (
            <DraggableItem
              key={index}
              id={item.id}
              text={item.text}
              dropped={true}
              onDelete={handleDelete}
              component={item.component}
            />
          ))}
        </div>
      </div>
      {showModal && (
        <Modal
          message={successMessage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default DropArea;
