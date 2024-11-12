import React from 'react';
import './showRouteModal.css'; // You can create a Modal.css file for styling or use inline styles if preferred

const ShowRouteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Do you want to see the route?</h3>
        <button className="see-Ruote-btn" onClick={onConfirm}>See Route</button>
        <button ClassName="see-Ruote-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShowRouteModal;
