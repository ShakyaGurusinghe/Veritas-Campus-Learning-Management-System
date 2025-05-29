import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/UserProfilePage.css'; // Import the CSS file

const UserProfilePage = () => {
  // Placeholder state for user data - replace with fetched data
  const [user, setUser] = useState({
    name: 'De Silva L S',
    email: 'sherindesilva1@gmail.com',
    // Add other relevant user details
  });

  // Placeholder state for course data - replace with fetched data
  const [courseDetails, setCourseDetails] = useState('you can find various courses, ranging from diplomas to advanced certifications, covering subjects like Business & Management, Arts & Humanities, and English.');

  // Placeholder state for privacy/policy data - replace with fetched data
  const [privacyPolicy, setPrivacyPolicy] = useState('Data Retention Summary');

  // Placeholder state for access data - replace with fetched data
  const [accessData, setAccessData] = useState({
    firstAccess: 'Tuesday, 2 August 2022, 8:17 PM (2 years 244 days ago)',
    lastAccess: 'Thursday, 3 April 2025, 7:49 AM (1 sec ago)',
  });

  // useEffect to fetch real data in a real application
  useEffect(() => {
    // Fetch user data, course data, etc.
    console.log('Fetching user profile data...');
    // Example fetch:
    // const fetchUserProfile = async () => {
    //   try {
    //     const response = await fetch('/api/instructor/profile');
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     const data = await response.json();
    //     setUser(data.user);
    //     setCourseDetails(data.courseDetails);
    //     setPrivacyPolicy(data.privacyPolicy);
    //     setAccessData(data.accessData);
    //   } catch (error) {
    //     console.error('Error fetching profile data:', error);
    //   }
    // };
    // fetchUserProfile();
  }, []);

  return (
    <div className="container mt-4 mb-5">
      <h1>Dashboard\profile</h1> {/* Using backslash as in Figma */}

      <div className="row">
        <div className="col-md-4">
          {/* Left Column: User Details */}
          <div className="profile-section card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="profile-avatar me-3">{/* Placeholder for avatar */}</div>
                <h2>{user.name}</h2>
              </div>
              <h6>User Details</h6>
              <p><Link to="/instructor/edit-profile">Edit profile</Link></p>
              <p>Email Address: {user.email}</p>
              <p><Link to="/instructor/reset-password">Reset Password</Link></p>
            </div>
          </div>

          {/* Left Column: Privacy and policies (Data Retention) */}
          <div className="profile-section card mt-4">
            <div className="card-body">
              <h6>Privacy and policies</h6>
              <p>{privacyPolicy}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          {/* Right Column: Course Details */}
          <div className="profile-section card">
            <div className="card-body">
              <h6>Course Details</h6>
              <p>{courseDetails}</p>
            </div>
          </div>

          {/* Right Column: Privacy and policies (Access Data) */}
          <div className="profile-section card mt-4">
             <div className="card-body">
              <h6>Privacy and policies</h6> {/* Appears twice in Figma, assuming intentional */}
              <p>First access to site: {accessData.firstAccess}</p>
              <p>Last access to site: {accessData.lastAccess}</p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default UserProfilePage; 