import React from 'react';
import '../css/SuccessModal.css';

const SuccessModal = ({ message = "Operation successful!", onClose, onViewAll, hideButtons = false }) => {
  return (
    <div className="modal-overlay">
      <div className={`modal-box ${hideButtons ? 'toast-style' : ''}`}>
        <h3>{message}</h3>
        {!hideButtons && (
          <div className="modal-buttons">
            <button className="primary-btn" onClick={onClose}>Yes</button>
            <button className="secondary-btn" onClick={onViewAll}>View All</button>
          </div>
        )}
        {hideButtons && (
          <span className="close-icon" onClick={onClose}>×</span>
        )}
      </div>
    </div>
  );
};

export default SuccessModal;