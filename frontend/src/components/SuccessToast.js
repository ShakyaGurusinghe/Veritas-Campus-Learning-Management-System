import React from 'react';
import '../css/SuccessToast.css';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessToast = ({ message, onClose }) => {
  return (
    <div className="success-toast">
      <FaCheckCircle className="check-icon" />
      <span>{message}</span>
      <span className="close-icon" onClick={onClose}>×</span>
    </div>
  );
};

export default SuccessToast;