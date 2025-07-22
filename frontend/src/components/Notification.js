// components/Notification.js
import React, { useEffect } from 'react';
import './Notification.css';

function Notification({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5001);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        {message}
        <button className="notification-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default Notification;