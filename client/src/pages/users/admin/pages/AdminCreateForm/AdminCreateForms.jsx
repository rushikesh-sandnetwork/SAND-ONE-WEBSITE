import React, { useState } from 'react';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminCreateForms.css';
import DraggableItem from './FormUtils/elements/DraggableItem';
import DropArea from './FormUtils/elements/DropArea';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const dragItems = [
  { id: "1", text: "Item 1" },
  { id: "3", text: "Item 2" },
  { id: "2", text: "Item 3" },
  { id: "4", text: "Item 4" },
  { id: "5", text: "Item 5" },
  { id: "6", text: "Item 6" },
  { id: "7", text: "Item 7" }
];

const AdminCreateForms = () => {
  const [items, setItems] = useState([]);

  const handleDrop = (item) => {
    const newItem = { id: item.id, text: item.text };
    const newItems = [...items, newItem];
    setItems(newItems);
  };

  return (
    <div className='create-form-container'>
      <div className="title">
        <PageTitle title="Create New Form" />
      </div>

      <div className="create-form-container-content">
        <DndProvider backend={HTML5Backend}>
          <div className="left-container">
            {dragItems.map((item, index) => (
              <DraggableItem
                key={item.id}
                id={item.id}
                text={item.text}
                dropped={false}
              />
            ))}
          </div>

          <div className="right-container">
            <DropArea onDrop={handleDrop} />
          </div>
        </DndProvider>
      </div>
    </div>
  );
};

export default AdminCreateForms;
