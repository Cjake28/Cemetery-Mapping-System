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
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear individual field error when user types
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "First Name is required";
    if (!formData.middle_name.trim()) newErrors.middle_name = "middle name is required";
    if (!formData.surname.trim()) newErrors.surname = "Surname is required";
    if (!formData.date_of_birth.trim()) newErrors.date_of_birth = "Date of Birth is required";
    if (!formData.date_of_death.trim()) newErrors.date_of_death = "Date of Death is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.burial_date.trim()) newErrors.burial_date = "Burial Date is required";
    if (!formData.owner_name.trim()) newErrors.owner_name = "Owner Name is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Set focus on the first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorField).focus();
      return;
    }
    onCreatePerson(formData); // Pass form data back to parent component
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='create-new-person-h2'>Create New Person</h2>
        <form onSubmit={handleSubmit} className='form-persons' autoComplete="off">

          <label htmlFor="name" className="modal-form-label-persons">First Name:</label>
          {errors.name && <span className="error-text-persons">{errors.name}</span>}
          <input type="text" id="name" name="name" className="modal-form-input-persons" value={formData.name} onChange={handleChange} autoComplete="off" />

          <label htmlFor="middle_name" className="modal-form-label-persons">Middle Name:</label>
          {errors.name && <span className="error-text-persons">{errors.middle_name}</span>}
          <input type="text" id="middle_name" name="middle_name" className="modal-form-input-persons" value={formData.middle_name} onChange={handleChange} autoComplete="off" />

          <label htmlFor="surname" className="modal-form-label-persons">Surname:</label>
          {errors.surname && <span className="error-text-persons">{errors.surname}</span>}
          <input type="text" id="surname" name="surname"  className="modal-form-input-persons"value={formData.surname} onChange={handleChange} autoComplete="off" />

          <label htmlFor="date_of_birth" className="modal-form-label-persons">Date of Birth:</label>
          {errors.date_of_birth && <span className="error-text-persons">{errors.date_of_birth}</span>}
          <input type="date" id="date_of_birth" name="date_of_birth" className="modal-form-input-persons" value={formData.date_of_birth} onChange={handleChange} />

          <label htmlFor="date_of_death" className="modal-form-label-persons">Date of Death:</label>
          {errors.date_of_death && <span className="error-text-persons">{errors.date_of_death}</span>}
          <input type="date" id="date_of_death" name="date_of_death" className="modal-form-input-persons" value={formData.date_of_death} onChange={handleChange} />

          <label htmlFor="location" className="modal-form-label-persons">Location:</label>
          {errors.location && <span className="error-text-persons">{errors.location}</span>}
          <input type="text" id="location" name="location" className="modal-form-input-persons" value={formData.location} onChange={handleChange} autoComplete="off" />

          <label htmlFor="burial_date" className="modal-form-label-persons">Burial Date:</label>
          {errors.burial_date && <span className="error-text-persons">{errors.burial_date}</span>}
          <input type="date" id="burial_date" name="burial_date" className="modal-form-input-persons" value={formData.burial_date} onChange={handleChange} />

          <label htmlFor="owner_name" className="modal-form-label-persons">Owner Name:</label>
          {errors.owner_name && <span className="error-text-persons">{errors.owner_name}</span>}
          <input type="text" id="owner_name" name="owner_name" className="modal-form-input-persons" value={formData.owner_name} onChange={handleChange} autoComplete="off" />

          <button type="submit" className="submit-btn-persons btn-perons">Create</button>
          <button type="button" className="cancel-btn-persons btn-perons" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
