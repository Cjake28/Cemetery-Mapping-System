import { useState } from 'react';
import './modal.css';
import axios from 'axios';
import { Loader } from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function ModalCreateUser({ isOpen, onClose, resetQueries }) {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        role: 'user', // Default role is 'user'
    });
    const [errors, setErrors] = useState({});
    const [fetchIsLoading, setFetchIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState();

    if (!isOpen) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
        }
    };

    const handleCreateUser = async (formdata) => {
        setFetchIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/admin/create-user`, formdata);
            resetQueries();
            setFormData({ name: '', username: '', password: '', role: 'user' }); // Reset form fields
            setFetchError(null);
            onClose();
        } catch (error) {
            console.error("Error creating user:", error);

            if (error.response) {
                setFetchError(error.response.data.message || "Error creating user");
            } else {
                setFetchError("A network error occurred, please try again later.");
            }
        }
        setFetchIsLoading(false);
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
            const firstErrorField = Object.keys(validationErrors)[0];
            document.getElementById(firstErrorField).focus();
            return;
        }
        handleCreateUser(formData);
    };

    const handleCloseModal = () => {
        setErrors({});
        setFormData({ name: '', username: '', password: '', role: 'user' });
        setFetchError(null);
        onClose();
    };

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

                    <fieldset className="role-selection">
                        <legend>Select Role</legend>
                        <label htmlFor="user-role">
                            <input
                                type="radio"
                                id="user-role"
                                name="role"
                                value="user"
                                checked={formData.role === 'user'}
                                onChange={handleChange}
                            />
                            User
                        </label>
                        <label htmlFor="admin-role">
                            <input
                                type="radio"
                                id="admin-role"
                                name="role"
                                value="admin"
                                checked={formData.role === 'admin'}
                                onChange={handleChange}
                            />
                            Admin
                        </label>
                    </fieldset>

                    {fetchError && <div className="error-message">{fetchError}</div>}

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
