import { useState } from 'react';
import './createPersonModal.css';

export default function CreatePersonModal({ onClose, onCreatePerson }) {
  const [formData, setFormData] = useState({
    name: '',
    middle_name: '',
    surname: '',
    date_of_birth: '',
    date_of_death: '',
    location: '',
    burial_date: '',
    owner_name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreatePerson(formData); // Pass form data back to parent component
    console.log("submit create Person",formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Person</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Middle Name:
            <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} required />
          </label>
          <label>
            Surname:
            <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
          </label>
          <label>
            Date of Birth:
            <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
          </label>
          <label>
            Date of Death:
            <input type="date" name="date_of_death" value={formData.date_of_death} onChange={handleChange} required />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </label>
          <label>
            Burial Date:
            <input type="date" name="burial_date" value={formData.burial_date} onChange={handleChange} required />
          </label>
          <label>
            Owner Name:
            <input type="text" name="owner_name" value={formData.owner_name} onChange={handleChange} required />
          </label>
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
