import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/PasswordChangedSuccessfulPage.css'; // Import the CSS file

const PasswordChangedSuccessfulPage = () => {
  return (
    <div className="password-changed-success-container">
      <h1>Password Changed!</h1>
      <div className="success-icon">✓</div> {/* Placeholder for a checkmark icon */}
      <p>Your Password has been Changed Successfully</p>
      {/* Assuming the back button goes to the profile page, adjust if needed */}
      <Link to="/instructor/profile" className="back-button">Back</Link>
    </div>
  );
};

export default PasswordChangedSuccessfulPage; 