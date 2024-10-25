import React, { useState } from 'react';
import './updatePasswordModal.css';
import axios from 'axios';

export default function UpdatePasswordModal({ isOpen, onClose, name, userID }) {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(''); // Error state for input validation
    const [axiosError, setAxiosError] = useState(''); // Error state for axios request
    const [loading, setLoading] = useState(false); // Loading state for submit button

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        setError('');
        setAxiosError('');

        // Validate password input (example: minimum 6 characters)
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            setLoading(true); // Start loading
            await axios.patch('/api/admin/update-password', { 
                userID, 
                newPassword 
            });
            setNewPassword('');
            onClose(); // Close the modal after submission
        } catch (error) {
            console.error('Error updating password:', error);

            // Check for specific error response and set axiosError state
            if (error.response) {
                setAxiosError(error.response.data.message || 'Failed to update password.');
            } else {
                setAxiosError('Network error. Please try again.');
            }
        } finally {
            setLoading(false); // End loading
        }
    };

    const handleCloseModal = ()=>{
        onClose();
        setNewPassword('')
    }

    if (!isOpen) return null;

    return (
        <div className="update-password-modal-overlay">
            <div className="update-password-modal-content">
                <h2 className="update-password-modal-title">Update Password for {name}</h2>

                <form className="update-password-form" onSubmit={handleSubmit}>
                    <div className="update-password-form-group">
                        <label className="update-password-label">New Password:</label>
                        <input 
                            className="update-password-input"
                            type="password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            autoComplete="off"
                        />
                        {error && <p className="input-error-message">{error}</p>}
                    </div>

                    <div className="update-password-modal-actions">
                        <button 
                            className="update-password-submit-btn" 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                        <button className="update-password-cancel-btn" type="button" onClick={handleCloseModal}>Cancel</button>
                    </div>

                    {/* Axios error message */}
                    {axiosError && <p className="axios-error-message">{axiosError}</p>}
                </form>
            </div>
        </div>
    );
}
