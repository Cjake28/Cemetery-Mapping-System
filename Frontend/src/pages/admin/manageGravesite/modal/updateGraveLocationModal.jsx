import { useState } from 'react';
import axios from 'axios';
import './updatePersonLatLng.css';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function UpdateGraveLocationModal({ isOpen, onClose, person, onUpdateSuccess }) {
    const [latLng, setLatLng] = useState({
        lat_lng_point_one: person?.lat_lng_point_one || '',
        lat_lng_point_two: person?.lat_lng_point_two || '',
        lat_lng_point_three: person?.lat_lng_point_three || '',
        lat_lng_point_four: person?.lat_lng_point_four || ''
    });

    const [errors, setErrors] = useState({
        lat_lng_point_one: '',
        lat_lng_point_two: '',
        lat_lng_point_three: '',
        lat_lng_point_four: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLatLng(prev => ({
            ...prev,
            [name]: value,
        }));
        setErrors(prev => ({
            ...prev,
            [name]: '',  // Clear any previous error when the user starts typing
        }));
    };

    const isValidLatLng = (latLng) => {
        const [lat, lng] = latLng.split(',').map(coord => parseFloat(coord.trim()));
        return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { lat_lng_point_one, lat_lng_point_two, lat_lng_point_three, lat_lng_point_four } = latLng;

        // Initialize error tracking
        const newErrors = {};

        // Validate each lat/lng input field
        if (!isValidLatLng(lat_lng_point_one)) {
            newErrors.lat_lng_point_one = 'Invalid Latitude/Longitude. Format: lat,lng ';
        }
        if (!isValidLatLng(lat_lng_point_two)) {
            newErrors.lat_lng_point_two = 'Invalid Latitude/Longitude. Format: lat,lng ';
        }
        if (!isValidLatLng(lat_lng_point_three)) {
            newErrors.lat_lng_point_three = 'Invalid Latitude/Longitude. Format: lat,lng ';
        }
        if (!isValidLatLng(lat_lng_point_four)) {
            newErrors.lat_lng_point_four = 'Invalid Latitude/Longitude. Format: lat,lng ';
        }

        // Check if there are any errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);  // Display errors and prevent submission
            return;
        }

        try {
            // Make the API request to update the lat/lng points if validation passes
            await axios.put(`${API_URL}/api/admin/update-lat-lng/${person.id}`, latLng);
            onUpdateSuccess();  // Refetch the persons list or update the UI
            onClose();  // Close the modal after successful update
        } catch (err) {
            console.error('Error updating grave location:', err);
        }
    };

    const handleCancel = () => {
        setErrors({
            lat_lng_point_one: '',
            lat_lng_point_two: '',
            lat_lng_point_three: '',
            lat_lng_point_four: ''
        });

        onClose();
    }

    if (!isOpen) return null; // Don't render the modal if it's not open
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Update Grave Location for {person?.fullname || `${person?.name} ${person?.surname}`}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Lat/Lng Point One:
                        {errors.lat_lng_point_one && <p className="error-text">{errors.lat_lng_point_one}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_one"
                            value={latLng.lat_lng_point_one}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Lat/Lng Point Two:
                        {errors.lat_lng_point_two && <p className="error-text">{errors.lat_lng_point_two}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_two"
                            value={latLng.lat_lng_point_two}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Lat/Lng Point Three:
                        {errors.lat_lng_point_three && <p className="error-text">{errors.lat_lng_point_three}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_three"
                            value={latLng.lat_lng_point_three}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Lat/Lng Point Four:
                        {errors.lat_lng_point_four && <p className="error-text">{errors.lat_lng_point_four}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_four"
                            value={latLng.lat_lng_point_four}
                            onChange={handleInputChange}
                        />
                    </label>
                    <div className="modal-actions">
                        <button type="submit">Update Location</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
