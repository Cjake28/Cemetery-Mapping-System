import { useState } from 'react';
import './modal.css';
import axios from 'axios';
import { Loader } from "lucide-react";

export default function ModalCreateUser({isOpen, onClose}) {
    const [formData, setFormData] = useState({ name: '', username: '', password: ''});
    const [errors, setErrors] = useState({});
    const [fetchIsLoading, setFetchIsLoading] = useState(false); // Updated name for consistency
    const [fetchError, setFetchError] = useState();

    if (!isOpen) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        // Clear individual field error when user types
        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
        }
    };

    const handleCreateUser = async (formdata) => {
        setFetchIsLoading(true); // Show loading state while fetching
        try {
            // Send POST request to create user
            const response = await axios.post('http://localhost:9220/api/admin/create-user', formdata);
            
            // If successful, clear the form and any errors
            console.log("User created:", response.data);
            setFormData({ name: '', username: '', password: '' }); // Reset form fields
            setFetchError(null); // Clear any error messages
    
            // Close modal on success
            onClose();
        } catch (error) {
            console.error("Error creating user:", error);
    
            // If there is a response with an error, set the error message to display
            if (error.response) {
                // Handle specific API errors
                setFetchError(error.response.data.message || "Error creating user");
            } else {
                // Handle other errors (like network issues)
                setFetchError("A network error occurred, please try again later.");
            }
    
            // Keep the modal open so the user can correct the inputs
        }
        setFetchIsLoading(false); // End loading state
    };
    

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.username.trim()) newErrors.username = "Username is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            // Set focus on the first error field
            const firstErrorField = Object.keys(validationErrors)[0];
            document.getElementById(firstErrorField).focus();
            return;
        }
        handleCreateUser(formData);
    };

    const handleCloseModal = () => {
        setErrors({});
        setFormData({ name: '', username: '', password: '' });
        setFetchError(null);
        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className='create-new-user-text'>Create New User</h2>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <label htmlFor="name" className="modal-form-label">Name:</label>
                    {errors.name && <span className="error-text">{errors.name}</span>}
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="modal-form-input"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="off"
                    />

                    <label htmlFor="username" className="modal-form-label">Username:</label>
                    {errors.username && <span className="error-text">{errors.username}</span>}
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="modal-form-input"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="off"
                    />

                    <label htmlFor="password" className="modal-form-label">Password:</label>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="modal-form-input"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="off"
                    />

                    {fetchError && <div className="error-message">{fetchError}</div>} {/* Display error */}

                    <div className="modal-actions">
                        <button type="submit" className="submit-btn" disabled={fetchIsLoading}>
                            {fetchIsLoading ? <Loader size={16} /> : 'Create'}
                        </button>
                        <button type="button" className="close-btn" onClick={handleCloseModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
