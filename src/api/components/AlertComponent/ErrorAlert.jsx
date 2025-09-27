import React from 'react';
import './ErrorAlert.css'; // Import the CSS file

const ModalErrorAlert = ({ message, onClose }) => {
  if (!message) return null; // Do not render if there is no message

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Error</h3>
          <span className="modal-close" onClick={onClose}>&times;</span>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ModalErrorAlert;
