import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem'; // Adjust the import path as needed
import './DropArea.css';

const DropArea = ({ onDrop }) => {
  const [droppedItems, setDroppedItems] = useState([]); // State to store dropped items

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'item',
    drop: (item) => {
      onDrop(item); // Call parent onDrop function to handle item drop
      setDroppedItems((prevItems) => [...prevItems, item]); // Update dropped items state correctly
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleDelete = (id) => {
    setDroppedItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className='drop-area' ref={dropRef}>
      <p>Create Form Here</p>
      <div>
        {droppedItems.map((item, index) => (
          <DraggableItem
            key={index}
            id={item.id}
            text={item.text}
            dropped={true}
            onDelete={handleDelete}
            component={item.component} // Pass the appropriate component
          />
        ))}
      </div>
    </div>
  );
};

export default DropArea;
