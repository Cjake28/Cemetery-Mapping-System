import { useState } from 'react';
import axios from 'axios';
import './updatelotmodal.css';

export default function UpdateVacantLotModal({ isOpen, onClose, lot, onUpdateSuccess }) {
    const [latLng, setLatLng] = useState({
        location: lot?.location || '',
        lat_lng_point_one: lot?.lat_lng_point_one || '',
        lat_lng_point_two: lot?.lat_lng_point_two || '',
        lat_lng_point_three: lot?.lat_lng_point_three || '',
        lat_lng_point_four: lot?.lat_lng_point_four || '',
        lat_lng_point_center: lot?.lat_lng_point_center || ''
    });

    const [errors, setErrors] = useState({
        location: '',
        lat_lng_point_one: '',
        lat_lng_point_two: '',
        lat_lng_point_three: '',
        lat_lng_point_four: '',
        lat_lng_point_center: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLatLng(prev => ({
            ...prev,
            [name]: value,
        }));
        setErrors(prev => ({
            ...prev,
            [name]: '',  // Clear previous error for the specific field
        }));
    };

    const isValidLatLng = (latLng) => {
        const [lat, lng] = latLng.split(',').map(coord => parseFloat(coord.trim()));
        return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { location, lat_lng_point_one, lat_lng_point_two, lat_lng_point_three, lat_lng_point_four, lat_lng_point_center } = latLng;
        const newErrors = {};

        // Validate fields
        if (!location) {
            newErrors.location = 'Location is required';
        }
        if (!isValidLatLng(lat_lng_point_one)) {
            newErrors.lat_lng_point_one = 'Invalid Latitude/Longitude for Point 1';
        }
        if (!isValidLatLng(lat_lng_point_two)) {
            newErrors.lat_lng_point_two = 'Invalid Latitude/Longitude for Point 2';
        }
        if (!isValidLatLng(lat_lng_point_three)) {
            newErrors.lat_lng_point_three = 'Invalid Latitude/Longitude for Point 3';
        }
        if (!isValidLatLng(lat_lng_point_four)) {
            newErrors.lat_lng_point_four = 'Invalid Latitude/Longitude for Point 4';
        }
        if (!isValidLatLng(lat_lng_point_center)) {
            newErrors.lat_lng_point_center = 'Invalid Latitude/Longitude for Center Point';
        }

        // If there are any errors, update the state and prevent form submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.put(`/api/vacantlots/${lot.id}`, latLng);
            onUpdateSuccess();  // Trigger the success callback
            onClose();  // Close the modal
            console.log('Update successful:', response.data);
        } catch (err) {
            console.error('Error updating vacant lot:', err);
        }
    };

    const handleCancel = () => {
        setErrors({
            location: '',
            lat_lng_point_one: '',
            lat_lng_point_two: '',
            lat_lng_point_three: '',
            lat_lng_point_four: '',
            lat_lng_point_center: ''
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Update Vacant Lot</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Location:
                        {errors.location && <p className="error-text">{errors.location}</p>}
                        <input
                            type="text"
                            name="location"
                            value={latLng.location}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Latitude/Longitude Point 1:
                        {errors.lat_lng_point_one && <p className="error-text">{errors.lat_lng_point_one}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_one"
                            value={latLng.lat_lng_point_one}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Latitude/Longitude Point 2:
                        {errors.lat_lng_point_two && <p className="error-text">{errors.lat_lng_point_two}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_two"
                            value={latLng.lat_lng_point_two}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Latitude/Longitude Point 3:
                        {errors.lat_lng_point_three && <p className="error-text">{errors.lat_lng_point_three}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_three"
                            value={latLng.lat_lng_point_three}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Latitude/Longitude Point 4:
                        {errors.lat_lng_point_four && <p className="error-text">{errors.lat_lng_point_four}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_four"
                            value={latLng.lat_lng_point_four}
                            onChange={handleInputChange}

                        />
                    </label>
                    <label>
                        Center Point:
                        {errors.lat_lng_point_center && <p className="error-text">{errors.lat_lng_point_center}</p>}
                        <input
                            type="text"
                            name="lat_lng_point_center"
                            value={latLng.lat_lng_point_center}
                            onChange={handleInputChange}

                        />
                    </label>
                    <div className="modal-actions">
                        <button type="submit">Update</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
