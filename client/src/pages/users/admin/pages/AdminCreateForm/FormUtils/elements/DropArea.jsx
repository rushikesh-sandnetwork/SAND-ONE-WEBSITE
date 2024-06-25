import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem';
import './DropArea.css';

const DropArea = ({ onDrop }) => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [droppedItemNames, setDroppedItemNames] = useState([]);

  useEffect(() => {
    console.log(droppedItemNames);
  }, [droppedItemNames]);

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

  return (
    <div className='drop-area' ref={dropRef}>
      <p>Create Form Here</p>
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
  );
};

export default DropArea;
