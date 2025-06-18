import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ToastMessage({ message, onClose }) {
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      const toastInstance = window.bootstrap.Toast.getOrCreateInstance(toastRef.current);
      toastInstance.show();
    }
  }, []);

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <div ref={toastRef} className="toast align-items-center text-bg-success border-0" role="alert">
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button type="button" className="btn-close me-2 m-auto" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
}

export default ToastMessage;
