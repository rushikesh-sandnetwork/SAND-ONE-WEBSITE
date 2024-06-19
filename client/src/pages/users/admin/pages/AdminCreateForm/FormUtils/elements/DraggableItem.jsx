import React from 'react';
import { useDrag } from 'react-dnd';
import './DraggableItem.css';

const DraggableItem = ({ id, text, dropped, onDelete, component: Component }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'item',
    item: { id, text, component: Component },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  if (dropped) {
    return (
      <div className="dropped-item">
        <input type="text" className='heading-text' placeholder={text} />
        <div className='dragged-item'>
          {Component && <Component />}
          <button onClick={() => onDelete(id)} className="delete-button">
            ❌
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        ref={dragRef}
        className="draggable-item"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <span className='dragItemTitle'>{text}</span>
      </div>
    );
  }
};

export default DraggableItem;
