import React, { useState } from "react";
import logo from "../assets/veritas.jpg";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div style={{ height: "30px", backgroundColor: "#55B649" }}></div>
      <nav className="navbar px-4 navbar-expand-sm align-items-center">
        <div className="navbar-brand d-flex align-items-center">
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
            className="d-none d-sm-inline-block"
          ></span>
          <span className="fw-bold fs-2">LearnDash</span>
        </div>
        <button
          className={`navbar-toggler ${isMenuOpen ? 'open' : ''}`}
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav fw-bold fs-6">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={toggleMenu}>
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/whoweare" className="nav-link" onClick={toggleMenu}>
                WHO WE ARE
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/programmes" className="nav-link" onClick={toggleMenu}>
                PROGRAMMES
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/news" className="nav-link" onClick={toggleMenu}>
                NEWS
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contactus" className="nav-link" onClick={toggleMenu}>
                CONTACT US
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to=""
                className="nav-link text-decoration-underline"
                onClick={toggleMenu}
              >
                GET STARTED
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/instructor/semesters"
                className="nav-link"
                style={{ color: "#55B649" }}
                onClick={toggleMenu}
              >
                INSTRUCTOR
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
