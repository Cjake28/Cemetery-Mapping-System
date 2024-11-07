// PrivacyModal.jsx
import React from 'react';
import './privacyModal.css';

export default function PrivacyModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Privacy Notice</h2>
        <p>
          The information given in this system is sensitive and intended solely for personal use. 
          Please do not share, distribute, or disclose any details you see without proper authorization 
          from the owner. By continuing to use the search function, you agree to keep all information 
          private and respect the privacy of individuals and families represented within this system.
        </p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
}
