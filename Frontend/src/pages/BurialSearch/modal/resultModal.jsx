// ResultModal.jsx
import React from 'react';
import './resultmodal.css';

export default function ResultModal({ isOpen, onClose, searchResults, openMap }) {
  if (!isOpen) return null;

  return (
    <div className="resultmodal-modal-overlay">
      <div className="resultmodal-modal-content">
        {searchResults.length > 0 ? (
          <div>
            <h2 className="result-modal-title">Match Found</h2>
            <p className="result-modal-text">{searchResults[0].fullname} - {searchResults[0].location}</p>
          </div>
        ):(
          <h2>No Matches Found</h2>
        )}
        <div className="result-modal-button-container">
        {searchResults.length > 0 
            && 
        <button className="look-on-map-btn resultmodal-close-button" onClick={openMap}> map</button>
        }
        <button className="resultmodal-close-button" onClick={onClose}>Close</button>
        </div>
        
      </div>
      
    </div>
  );
}
