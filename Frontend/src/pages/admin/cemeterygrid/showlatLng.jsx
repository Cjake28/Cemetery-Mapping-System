import React, { useState } from 'react';
import './showlatlng.css'
const ShowLatLng = ({ latlng, onClose }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const handleCopy = () => {
    const textToCopy = `${latlng.lat}, ${latlng.lng}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy'), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="modal-cemeterylatlng-overlay">
      <div className="modal-cemeterylatlng-content">
        <h3>{latlng ? `${latlng.lat}, ${latlng.lng}` : 'Try Again'}</h3>
        <button className="see-latlng-btn" onClick={handleCopy}>{copyButtonText}</button>
        <button className="see-latlng-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShowLatLng;
