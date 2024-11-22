import React, { useState } from 'react';
import '../styles/FormModal.css';

const FormModal = ({ fields, onSave, onClose }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add New Item</h3>
        {fields.map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            onChange={handleChange}
          />
        ))}
        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
