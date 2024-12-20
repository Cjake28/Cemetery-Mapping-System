import { useState } from 'react';
import axios from 'axios';
import './createvacantModal.css';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function CreateVacantLotModal({ isOpen, onClose, onCreateSuccess }) {
    const [vacantLotData, setVacantLotData] = useState({
        location: '',
        lat_lng_point_center: '',
        grave_type: '', // New field for grave type
        grave_size: '', // New field for grave size
    });
    const [createError, setCreateError] = useState(null);
    const [errors, setErrors] = useState({
        location: '',
        lat_lng_point_center: '',
        grave_type: '',
        grave_size: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVacantLotData(prev => ({
            ...prev,
            [name]: value,
        }));
        setErrors(prev => ({
            ...prev,
            [name]: '',
        }));
        setCreateError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!vacantLotData.location.trim()) newErrors.location = 'This field cannot be empty.';
        if (!vacantLotData.lat_lng_point_center.trim()) newErrors.lat_lng_point_center = 'This field cannot be empty.';
        if (!vacantLotData.grave_type.trim()) newErrors.grave_type = 'Please select a grave type.';
        if (!vacantLotData.grave_size.trim()) newErrors.grave_size = 'This field cannot be empty.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await axios.post(`${API_URL}/api/vacantlots`, { vacantLotData });
            onCreateSuccess();
            onClose();
        } catch (err) {
            setCreateError(err.response?.data?.message || 'Failed to create vacant lot');
            console.error('Error creating vacant lot:', err);
        }
    };

    const handleCancel = () => {
        setErrors({ location: '', lat_lng_point_center: '', grave_type: '', grave_size: '' });
        onClose();
        setCreateError(null);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create New Vacant Lot</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Location:
                        {errors.location && <p className="error-text">{errors.location}</p>}
                        <input
                            type="text"
                            name="location"
                            value={vacantLotData.location}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Latitude/Longitude Center Point:
                        {errors.lat_lng_point_center && <p className="error-text">{errors.lat_lng_point_center}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_center"
                            value={vacantLotData.lat_lng_point_center}
                            onChange={handleInputChange}
                        />
                    </label>
                    <fieldset>
                        <legend>Grave Type:</legend>
                        {errors.grave_type && <p className="error-text">{errors.grave_type}</p>}
                        <div className="radio-group">
                            
                            <div className="radio-item">
                            <label htmlFor="lawn-lot">Lawn Lot</label>
                                <input
                                    type="radio"
                                    id="lawn-lot"
                                    name="grave_type"
                                    value="Lawn Lot"
                                    checked={vacantLotData.grave_type === 'Lawn Lot'}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="radio-item">
                            <label htmlFor="mausoleum">Mausoleum</label>
                                <input
                                    type="radio"
                                    id="mausoleum"
                                    name="grave_type"
                                    value="Mausoleum"
                                    checked={vacantLotData.grave_type === 'Mausoleum'}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="radio-item">
                            <label htmlFor="apartment">Apartment</label>
                                <input
                                    type="radio"
                                    id="apartment"
                                    name="grave_type"
                                    value="Apartment"
                                    checked={vacantLotData.grave_type === 'Apartment'}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </fieldset>
                    <label>
                        Grave Size:
                        {errors.grave_size && <p className="error-text">{errors.grave_size}</p>}
                        <input
                            type="text"
                            name="grave_size"
                            placeholder="8x3ft"
                            value={vacantLotData.grave_size}
                            onChange={handleInputChange}
                        />
                    </label>
                    {createError && <p className="error-text">{createError}</p>}
                    <div className="modal-actions">
                        <button type="submit">Create Vacant Lot</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
