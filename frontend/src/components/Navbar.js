import React, { useState, useEffect } from "react";
import logo from "../assets/veritas.jpg";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);

  // Assuming a function to fetch user data after authentication (like from localStorage or API)
  useEffect(() => {
    // Example: Retrieve user data from localStorage or global state
    const storedUser = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    // Remove user data from localStorage (or implement logout logic)
    localStorage.removeItem("user");
    setUser(null); // Update the state to reflect logout
  };

  return (
    <div>
      <div style={{ height: "30px", backgroundColor: "#55B649" }}></div>
      <nav className="navbar px-4 navbar-expand-sm">
        <div className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            width="80"
            height="70"
            className="d-inline-block me-1"
          />
          <span
            style={{
              height: "40px",
              borderLeft: "2px solid #000",
              marginRight: "15px",
            }}
          ></span>
          <span className="fw-bold fs-2">LearnDash</span>
        </div>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#NavbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="NavbarMenu"
        >
          <ul className="navbar-nav fw-bold fs-6">
            <li className="nav-item me-3">
              <Link to="/" className="nav-link">
                HOME
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/whoweare" className="nav-link">
                WHO WE ARE
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/programmes" className="nav-link">
                PROGRAMMES
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/news" className="nav-link">
                NEWS
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/contactus" className="nav-link">
                CONTACT US
              </Link>
            </li>

            {/* If user is logged in, show profile info, otherwise show 'Get Started' */}
            {user ? (
              <li className="nav-item me-3">
                <div className="d-flex align-items-center">
                  <img
                    src={user.profilePic} // Assume the user object contains profilePic URL
                    alt="Profile"
                    width="40"
                    height="40"
                    className="rounded-circle me-2"
                  />
                  <span>{user.username}</span>
                  <button className="btn btn-link ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <li className="nav-item me-3">
                <Link
                  to="/login" // Redirect to login page if not authenticated
                  className="nav-link text-decoration-underline"
                >
                  GET STARTED
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
