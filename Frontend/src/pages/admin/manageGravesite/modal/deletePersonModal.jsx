import React, { useState } from 'react';
import axios from 'axios';
import {useQueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function DeletePersonModal({ isOpen, onClose, name, personID }) {
    const queryClient = useQueryClient();
    const [errorMessage, setErrorMessage] = useState(''); // State to track error messages
    const [isLoading, setIsLoading] = useState(false); // State to show loading during the request

    const handleDisable = async () => {
        setIsLoading(true); // Set loading to true when request starts
        setErrorMessage(''); // Reset any previous error message
        try {
            await axios.delete(`${API_URL}/api/admin/delete-person/${personID}` );
            queryClient.invalidateQueries(['persons']);
            setTimeout(function() {
                onClose();
            }, 80)
        } catch (error) {
            console.error('Error disabling user:', error);
            // Handle error and set error message
            if (error.response) {
                // Errors from the server
                setErrorMessage(error.response.data.message || 'Failed to disable user.');
            } else if (error.request) {
                // No response from the server
                setErrorMessage('No response from the server. Please check your network connection.');
            } else {
                // Other errors
                setErrorMessage('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false); // Stop loading after the request finishes
        }
    };

    if (!isOpen) return null;

    return (
        <div className="disable-user-modal-overlay">
            <div className="disable-user-modal-content">
                <h2 className="disable-user-modal-title">Delete Person</h2>
                <p className="disable-user-modal-text">
                    Are you sure you want to Delete this Person: <strong>{name}</strong>?
                </p>

                {/* Display error message if present */}
                {errorMessage && <p className="disable-user-error">{errorMessage}</p>}

                <div className="disable-user-modal-actions">
                    <button 
                        className="disable-user-btn" 
                        onClick={handleDisable}
                        disabled={isLoading} // Disable button during loading
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                    <button 
                        className="cancel-disable-btn" 
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
