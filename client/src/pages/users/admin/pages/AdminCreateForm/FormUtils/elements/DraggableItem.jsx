import React from 'react';
import { useDrag } from 'react-dnd';
import './DraggableItem.css';

const DraggableItem = ({ id, text, dropped, onDelete }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'item',
    item: { id, text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className="draggable-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span className='dragItemTitle'>{text}</span>
      {dropped && (
        <div className='dragged-item'>
        {/* <input type="button" value="submit" /> */}
        <button   onClick={() => onDelete(id)} className="delete-button">
          ❌
        </button>
        </div>
 
      )}
    </div>
  );
};

export default DraggableItem;
