import React, { useState } from 'react';
import './updatePersonModal.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export default function UpdatePersonModal({ isOpen, onClose, person, onUpdateSuccess }) {
    const [formData, setFormData] = useState({
        name: person.name || '',
        middle_name: person.middle_name || '',
        surname: person.surname || '',
        date_of_birth: person.date_of_birth || '',
        date_of_death: person.date_of_death || '',
        location: person.location || '',
        burial_date: person.burial_date || '',
        owner_name: person.owner_name || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdatePerson = async () => {
        try {
            await axios.put(`${API_URL}/api/admin/gravesites/${person.id}`, formData);
            onUpdateSuccess();
            onClose(); 
        } catch (err) {
            console.error('Error updating person:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Update Person Information</h2>
                <form>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />

                    <label>Middle Name</label>
                    <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} />

                    <label>Surname</label>
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} />

                    <label>Date of Birth</label>
                    <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />

                    <label>Date of Death</label>
                    <input type="date" name="date_of_death" value={formData.date_of_death} onChange={handleChange} />

                    <label>Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />

                    <label>Burial Date</label>
                    <input type="date" name="burial_date" value={formData.burial_date} onChange={handleChange} />

                    <label>Owner Name</label>
                    <input type="text" name="owner_name" value={formData.owner_name} onChange={handleChange} />
                </form>
                <div className="modal-buttons">
                    <button onClick={handleUpdatePerson}>Update</button>
                    <button onClick={() => {
                        onClose(),
                        setFormData({
                            name: person.name || '',
                            middle_name: person.middle_name || '',
                            surname: person.surname || '',
                            date_of_birth: person.date_of_birth || '',
                            date_of_death: person.date_of_death || '',
                            location: person.location || '',
                            burial_date: person.burial_date || '',
                            owner_name: person.owner_name || '',
                        })
                        }}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
