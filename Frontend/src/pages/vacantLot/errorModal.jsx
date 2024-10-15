import React from 'react';
import './errormodal.css'; // Import the CSS for the modal

const ErrorModal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children} {/* This will display the error message */}
      </div>
    </div>
  );
};

export default ErrorModal;
