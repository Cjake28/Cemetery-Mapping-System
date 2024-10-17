import { useState } from 'react';
import axios from 'axios';
import './createvacantModal.css';

export default function CreateVacantLotModal({ isOpen, onClose, onCreateSuccess }) {
    const [vacantLotData, setVacantLotData] = useState({
        location: '',
        lat_lng_point_one: '',
        lat_lng_point_two: '',
        lat_lng_point_three: '',
        lat_lng_point_four: '',
        lat_lng_point_center: '',
    });
    const [createError, setCreateError] = useState(null);

    const [errors, setErrors] = useState({
        location: '',
        lat_lng_point_one: '',
        lat_lng_point_two: '',
        lat_lng_point_three: '',
        lat_lng_point_four: '',
        lat_lng_point_center: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVacantLotData(prev => ({
            ...prev,
            [name]: value,
        }));
        setErrors(prev => ({
            ...prev,
            [name]: '',  // Clear any previous error when the user starts typing
        }));
        setCreateError(null); // Clear general error message on input change
    };
    const isValidInput = (value) => value.trim() !== '';

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate each input field
        const newErrors = {};
        Object.keys(vacantLotData).forEach((field) => {
            if (!isValidInput(vacantLotData[field])) {
                newErrors[field] = 'This field cannot be empty.';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);  // Display errors and prevent submission
            return;
        }

        try {
            await axios.post('http://localhost:9220/api/vacantlots', { vacantLotData });
            onCreateSuccess();  // Refetch the vacant lots or update the UI
            onClose();  // Close the modal after successful creation
        } catch (err) {
            setCreateError(err.response?.data?.message || 'Failed to create vacant lot');
            console.error('Error creating vacant lot:', err);
        }
    };

    const handleCancel = () => {
        setErrors({
            location: '',
            lat_lng_point_one: '',
            lat_lng_point_two: '',
            lat_lng_point_three: '',
            lat_lng_point_four: '',
            lat_lng_point_center: '',
        });
        onClose();
        setCreateError(null); 
    };

    if (!isOpen) return null; // Don't render the modal if it's not open

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
                        Latitude/Longitude Point 1:
                        {errors.lat_lng_point_one && <p className="error-text">{errors.lat_lng_point_one}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_one"
                            value={vacantLotData.lat_lng_point_one}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Latitude/Longitude Point 2:
                        {errors.lat_lng_point_two && <p className="error-text">{errors.lat_lng_point_two}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_two"
                            value={vacantLotData.lat_lng_point_two}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Latitude/Longitude Point 3:
                        {errors.lat_lng_point_three && <p className="error-text">{errors.lat_lng_point_three}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_three"
                            value={vacantLotData.lat_lng_point_three}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Latitude/Longitude Point 4:
                        {errors.lat_lng_point_four && <p className="error-text">{errors.lat_lng_point_four}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_four"
                            value={vacantLotData.lat_lng_point_four}
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
