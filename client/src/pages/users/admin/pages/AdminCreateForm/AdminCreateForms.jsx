import React, { useState } from 'react';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminCreateForms.css';
import DraggableItem from './FormUtils/elements/DraggableItem';
import DropArea from './FormUtils/elements/DropArea';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Heading from './FormUtils/elements/FormFields/Heading/Heading';
import FullName from './FormUtils/elements/FormFields/FullName/FullName';
import Email from './FormUtils/elements/FormFields/Email/Email';
import Address from './FormUtils/elements/FormFields/Address/Address';
import Phone from './FormUtils/elements/FormFields/Phone/Phone';
import DatePicker from './FormUtils/elements/FormFields/DatePicker/DatePicker';
import Appointment from './FormUtils/elements/FormFields/Appointment/Appointment';
import Signature from './FormUtils/elements/FormFields/Signature/Signature';
import ShortText from './FormUtils/elements/FormFields/ShortText/ShortText';
import LongText from './FormUtils/elements/FormFields/LongText/LongText';
import DropDown from './FormUtils/elements/FormFields/DropDown/DropDown';
import SingleChoice from './FormUtils/elements/FormFields/SingleChoice/SingleChoice';
import MultipleChoice from './FormUtils/elements/FormFields/MultipleChoice/MultipleChoice';
import Number from './FormUtils/elements/FormFields/Number/Number';
import Image from './FormUtils/elements/FormFields/Image/Image';
import FIleUpload from './FormUtils/elements/FormFields/FileUpload/FIleUpload';
import StarRating from './FormUtils/elements/FormFields/StarRating/StarRating';
import ScaleRating from './FormUtils/elements/FormFields/ScaleRating/ScaleRating';


const dragItems = [
  { id: "1", text: "Heading", component: Heading },
  { id: "2", text: "Full Name", component: FullName },
  { id: "3", text: "Email", component: Email },
  { id: "4", text: "Address",component: Address },
  { id: "5", text: "Phone", component: Phone },
  { id: "6", text: "Date Picker", component: DatePicker },
  { id: "7", text: "Appointment", component: Appointment },
  { id: "8", text: "Short Text", component: ShortText },
  { id: "9", text: "Long Text", component: LongText },
  { id: "10", text: "Drop Down", component: DropDown },
  { id: "11", text: "Single Choice",component: SingleChoice  },
  { id: "12", text: "Multiple Choice",component: MultipleChoice  },
  { id: "13", text: "Number", component: Number },
  { id: "14", text: "Image",component: Image },
  { id: "15", text: "File Upload",  component: FIleUpload},
  { id: "16", text: "Star Rating",component: StarRating },
  { id: "17", text: "Scale Rating", component: ScaleRating },
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