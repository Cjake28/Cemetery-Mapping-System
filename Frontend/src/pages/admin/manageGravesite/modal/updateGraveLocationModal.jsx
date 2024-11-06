import { useState } from 'react';
import axios from 'axios';
import './updatePersonLatLng.css';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function UpdateGraveLocationModal({ isOpen, onClose, person, onUpdateSuccess }) {
    const [centerLatLng, setCenterLatLng] = useState(person?.center_lat_lng || '');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setCenterLatLng(e.target.value);
        setError('');  // Clear any previous error when the user starts typing
    };

    const isValidLatLng = (latLng) => {
        const [lat, lng] = latLng.split(',').map(coord => parseFloat(coord.trim()));
        return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the center_lat_lng input
        if (!isValidLatLng(centerLatLng)) {
            setError('Invalid Latitude/Longitude. Format: lat,lng');
            return;
        }

        try {
            // Make the API request to update the center_lat_lng if validation passes
            await axios.put(`${API_URL}/api/admin/update-lat-lng/${person.id}`, { center_lat_lng: centerLatLng });
            onUpdateSuccess();  // Refetch the persons list or update the UI
            onClose();  // Close the modal after successful update
        } catch (err) {
            console.error('Error updating grave location:', err);
        }
    };

    const handleCancel = () => {
        setError('');
        onClose();
    };

    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Update Grave Location for {person?.fullname || `${person?.name} ${person?.surname}`}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Center Lat/Lng:
                        {error && <p className="error-text">{error}</p>}
                        <input
                            type="text"
                            name="center_lat_lng"
                            value={centerLatLng}
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
