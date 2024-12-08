import React from 'react';
import './showRouteModal.css'; // You can create a Modal.css file for styling or use inline styles if preferred

const ShowRouteModal = ({ show, onClose, onConfirm, selectedLot }) => {
  if (!show) return null;
  return (
    <div className="showRouteModal-overlay">
      <div className="showRouteModal-content">
        <h3>type: {selectedLot?.grave_type}</h3>
        <h3>size: {selectedLot?.grave_size}</h3>
        <button className="showRouteModal-see-btn " onClick={onConfirm}>See Route</button>
        <button className="showRouteModal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShowRouteModal;
