import React, { useState } from 'react';
import './enableUserModal.css';
import axios from 'axios';

export default function EnableUserModal({ isOpen, onClose, name, userID }) {
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const [isLoading, setIsLoading] = useState(false); // State for loading

    const handleEnable = async () => {
        setIsLoading(true); // Start loading
        setErrorMessage(''); // Reset error message

        try {
            await axios.patch('http://localhost:9220/api/admin/reverify-user', { userID });
            onClose();
        } catch (error) {
            console.error('Error re-verifying user:', error);
            // Set the error message based on the type of error
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Failed to reverify user.');
            } else if (error.request) {
                setErrorMessage('No response from the server. Please check your network connection.');
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false); // End loading
        }
    };

    if (!isOpen) return null;

    return (
        <div className="enable-user-modal-overlay">
            <div className="enable-user-modal-content">
                <h2 className="enable-user-modal-title">Reverify User</h2>
                <p className="enable-user-modal-text">
                    Are you sure you want to reverify this user: <strong>{name}</strong>?
                </p>

                {/* Display error message if there's any */}
                {errorMessage && <p className="enable-user-error">{errorMessage}</p>}

                <div className="enable-user-modal-actions">
                    <button 
                        className="enable-user-btn" 
                        onClick={handleEnable}
                        disabled={isLoading} // Disable during loading
                    >
                        {isLoading ? 'Re-verifying...' : 'Reverify'}
                    </button>
                    <button 
                        className="cancel-enable-btn" 
                        onClick={onClose}
                        disabled={isLoading} // Prevent cancel while loading
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
