import React from 'react';
import '../css/SuccessModal.css';

const ConfirmDeleteModal = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{message}</h3>
        <div className="modal-buttons">
          <button className="primary-btn" onClick={onConfirm}>Yes</button>
          <button className="secondary-btn" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;