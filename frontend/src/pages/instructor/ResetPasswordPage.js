import React, { useState } from 'react';
import '../../css/ResetPasswordPage.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Reset password submitted:', formData);
    // You would typically call a backend API here
  };

  return (
    <div className="container mt-4 mb-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            {/* Add more breadcrumb items based on your site structure, e.g., linking back to the profile page */}
            <li className="breadcrumb-item active" aria-current="page">Reset Password</li>
          </ol>
        </nav>

      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} className="reset-password-form mt-4">
        <div className="form-group mb-3">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Change Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage; 