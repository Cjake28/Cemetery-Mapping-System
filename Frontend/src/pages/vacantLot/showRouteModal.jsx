import React from 'react';
import './showRouteModal.css'; // You can create a Modal.css file for styling or use inline styles if preferred

const ShowRouteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="showRouteModal-overlay">
      <div className="showRouteModal-content">
        <h3>Do you want to see the route?</h3>
        <button className="showRouteModal-see-btn " onClick={onConfirm}>See Route</button>
        <button ClassName="showRouteModal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShowRouteModal;
