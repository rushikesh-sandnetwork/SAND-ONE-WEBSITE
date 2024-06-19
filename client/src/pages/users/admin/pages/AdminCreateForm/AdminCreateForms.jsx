import React, { useState } from 'react';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminCreateForms.css';
import DraggableItem from './FormUtils/elements/DraggableItem';
import DropArea from './FormUtils/elements/DropArea';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ComponentA = () => <div>Component A Content</div>;
const ComponentB = () => <div>Component B Content</div>;
const ComponentC = () => <div>Component C Content</div>;

const dragItems = [
  { id: "1", text: "Heading", component: ComponentA },
  { id: "2", text: "Full Name", component: ComponentB },
  { id: "3", text: "Email", component: ComponentC },
  { id: "4", text: "Address",component: ComponentC },
  { id: "5", text: "Phone", component: ComponentC },
  { id: "6", text: "Date Picker", component: ComponentC },
  { id: "7", text: "Appointment", component: ComponentC },
  { id: "8", text: "Signature", component: ComponentC },
  { id: "9", text: "Short Text", component: ComponentC },
  { id: "10", text: "Long Text", component: ComponentC },
  { id: "11", text: "Drop Down", component: ComponentC },
  { id: "12", text: "Single Choice",component: ComponentC  },
  { id: "13", text: "Multiple Choice",component: ComponentC  },
  { id: "14", text: "Number", component: ComponentC },
  { id: "15", text: "Image",component: ComponentC },
  { id: "16", text: "File Upload",  component: ComponentC},
  { id: "17", text: "Star Rating",component: ComponentC },
  { id: "18", text: "Scale Rating", component: ComponentC },
];

const AdminCreateForms = () => {
  const [items, setItems] = useState([]);

  const handleDrop = (item) => {
    const newItem = { id: item.id, text: item.text, component: item.component };
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
            {dragItems.map((item) => (
              <DraggableItem
                key={item.id}
                id={item.id}
                text={item.text}
                dropped={false}
                component={item.component}
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
