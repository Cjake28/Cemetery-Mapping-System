import React, { useState } from 'react';
import axios from 'axios';
import './deletelotmodal.css';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function DeleteVacantLotModal({ isOpen, onClose, location, lotID }) {
    const [errorMessage, setErrorMessage] = useState(''); // State to track error messages
    const [isLoading, setIsLoading] = useState(false); // State to show loading during the request

    const handleDelete = async () => {
        setIsLoading(true); // Set loading to true when request starts
        setErrorMessage(''); // Reset any previous error message
        try {
            await axios.delete(`${API_URL}/api/vacantlots/${lotID}`);
            setTimeout(() => {
                onClose(); // Close the modal after successful delete
            }, 80);
        } catch (error) {
            console.error('Error deleting vacant lot:', error);
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Failed to delete vacant lot.');
            } else if (error.request) {
                setErrorMessage('No response from the server. Please check your network connection.');
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false); // Stop loading after the request finishes
        }
    };

    if (!isOpen) return null;

    return (
        <div className="delete-lot-modal-overlay">
            <div className="delete-lot-modal-content">
                <h2 className="delete-lot-modal-title">Delete Vacant Lot</h2>
                <p className="delete-lot-modal-text">
                    Are you sure you want to delete the lot at location: <strong>{location}</strong>?
                </p>

                {/* Display error message if present */}
                {errorMessage && <p className="delete-lot-error">{errorMessage}</p>}

                <div className="delete-lot-modal-actions">
                    <button
                        className="delete-lot-btn"
                        onClick={handleDelete}
                        disabled={isLoading} // Disable button during loading
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                    <button
                        className="cancel-delete-btn"
                        onClick={onClose}
                        disabled={isLoading} // Disable cancel during loading to prevent conflicts
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
