// import React from 'react';
import './generalModal.css';

export default function GeneralModal({ 
    title, 
    data, 
    onConfirm, 
    onClose 
}) {
    return (
        <div className="general-modal-overlay">
            <div className="general-modal-container">
                {/* Title */}
                <div className="general-modal-title">
                    <h2>{title}</h2>
                </div>

                {/* Scrollable Content */}
                <div className="general-modal-content">
                    {data.length > 0 ? (
                        data.map((name, index) => (
                            <p key={index} className="general-modal-item">{name}</p>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="general-modal-actions">
                    <button className="general-modal-confirm-btn" onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className="general-modal-close-btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
