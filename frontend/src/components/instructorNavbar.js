
import React, { useState } from "react";
import logo from "../assets/veritas.jpg";
import { Link } from "react-router-dom";
import userImg from "../assets/user.png";

const Navbar = () => {
  const [showProgrammes, setShowProgrammes] = useState(false);
  const [showDiplomaSubmenu, setShowDiplomaSubmenu] = useState(false);
  const [showManagementSubmenu, setShowManagementSubMenu] = useState(false);

  const toggleProgrammes = () => {
    setShowProgrammes(!showProgrammes);
    setShowDiplomaSubmenu(false);
    setShowManagementSubMenu(false);
  }

  const toggleDiplomaSubmenu = () => {
    setShowDiplomaSubmenu(!showDiplomaSubmenu);
    setShowManagementSubMenu(false);
  };

  const toggleManagementSubmenu = () => {
    setShowManagementSubMenu(!showManagementSubmenu);
  };

  const closeAllDropdown = () => {
    setShowProgrammes(false);
    setShowDiplomaSubmenu(false);
    setShowManagementSubMenu(false);
  };

  return (
    <header>
      <div style={{ height: "30px", backgroundColor: "#55B649" }}></div>
      <nav
        className="navbar px-4 navbar-expand-sm"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="navbar-brand d-flex align-items-center">
          <img
            src={logo}
            alt="Veritas Campus Logo"
            width="80"
            height="70"
            className="d-inline-block me-2"
          />
          <span
            style={{
              height: "40px",
              borderLeft: "2px solid #000",
              marginRight: "15px",
            }}
            aria-hidden="true"
          ></span>
          <span className="fw-bold fs-2">LearnDash</span>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#NavbarMenu"
          aria-controls="NavbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="NavbarMenu">
          <ul className="navbar-nav fw-bold fs-6">
            <li className="nav-item me-3">
              <Link to="/" className="nav-link">HOME</Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/whoweare" className="nav-link">WHO WE ARE</Link>
            </li>
            <li className="nav-item dropdown me-3">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                onClick={toggleProgrammes}
                aria-haspopup="true"
                aria-expanded={showProgrammes}
                aria-controls="programmesDropdown"
                style={{ cursor: "pointer",
                          backgroundColor: showProgrammes ? "#95C436" : "transparent",
                          color: showProgrammes ? "#fff"  : "inherit",
                          padding: "8px 16px",
                          display: "inline-block",
                          lineHeight: "1.5",
                          verticalAlign: "middle",
                          marginTop: "0"
                }}
              >
                PROGRAMMES
              </span>
              {showProgrammes && (
                <ul className="dropdown-menu show" id="programmesDropdown" role="menu">
                  <li>
                    <Link 
                      to="/degreeprogrammes" 
                      className="dropdown-item" 
                      onClick={closeAllDropdown}
                      style={{ fontSize: "0.85rem" }}
                    >
                      DEGREE PROGRAMMES ▸
                    </Link>
                  </li>
                  <li className="dropdown-submenu position-relative">
                    <button
                      className="dropdown-item"
                      onClick={toggleDiplomaSubmenu}
                      aria-haspopup="true"
                      aria-expanded={showDiplomaSubmenu}
                      style={{ textAlign: "left", 
                                width: "100%",
                                backgroundColor: showDiplomaSubmenu ? "#95C436" : "transparent",
                                color: showDiplomaSubmenu ? "#fff" : "inherit",
                                fontSize: "0.85rem"
                            }}
                    > 
                      DIPLOMA PROGRAMMES ▸
                    </button>
                    {showDiplomaSubmenu && (
                      <ul
                        className="dropdown-menu show position-absolute top-0 start-100 mt-0"
                        role="menu"
                        style={{ minWidth: "220px" }}
                      >
                        <li>
                          <Link to="/diploma/overview" className="dropdown-item" onClick={closeAllDropdown} style={{ fontSize: "0.85rem" }}>
                            OVERVIEW
                          </Link>
                        </li>
                        <li>
                          <Link to="/diploma/arts" className="dropdown-item" onClick={closeAllDropdown} style={{ fontSize: "0.85rem" }}>
                            ARTS & HUMANITIES ▸
                          </Link>
                        </li>
                        <li className="dropdown-submenu position-relative">
                          <button
                            className="dropdown-item"
                            onClick={toggleManagementSubmenu}
                            aria-haspopup="true"
                            aria-expanded={showManagementSubmenu}
                            style={{ textAlign: "left", 
                                      width: "100%",
                                      backgroundColor: showManagementSubmenu ? "#95C436" : "transparent",
                                      color: showManagementSubmenu ? "#fff"  : "inherit",
                                      fontSize: "0.85rem"
                                    }}
                          >
                            MANAGEMENT & BUSINESS STUDIES  ▸
                          </button>
                          {showManagementSubmenu && (
                            <ul 
                              className="dropdown-menu show position-absolute start-0 mt-0"
                              role="menu"
                              style={{ minWidth: "280px", top: "100%", marginLeft: "130px" }}
                            >
                              <li>
                                <Link to="/diploma/management/overview" className="dropdown-item" onClick={closeAllDropdown} style={{ fontSize: "0.85rem" }}>
                                  OVERVIEW
                                </Link>
                              </li>
                              <li>
                                <Link to="/modules" className="dropdown-item" onClick={closeAllDropdown} style={{ fontSize: "0.85rem" }}>
                                  DIP. in HUMAN RESOURCE MANAGEMENT
                                </Link>
                              </li>
                              <li>
                                <Link to="/modules" className="dropdown-item" onClick={closeAllDropdown} style={{ fontSize: "0.85rem" }}>
                                  DIP. in BUSINESS STUDIES
                                </Link>
                              </li>
                              <li>
                                <Link to="/modules" className="dropdown-item" onClick={closeAllDropdown} style={{ fontSize: "0.85rem" }}>
                                  DIP. in INTERNAL & SALES MARKETING 
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item me-3">
              <Link to="/news" className="nav-link">NEWS</Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/contactus" className="nav-link">CONTACT US</Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/getstarted" className="nav-link text-decoration-underline">
                GET STARTED
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/instructor/profile" className="nav-link d-flex flex-column align-items-center" style={{gap: '4px', padding: 0}}>
                <img
                  src={userImg}
                  alt="Profile"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #222' }}
                />
                <span style={{ fontWeight: 600, color: '#222', fontSize: '0.95rem', marginTop: '2px' }}>De Silva L S</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="breadcrumb-container my-3" style={{ fontWeight: 600, fontSize: '1rem', textAlign: 'left', marginLeft: '40px' }}>
        <span>HOME</span>
        {showProgrammes && <span> / PROGRAMMES</span>}
        {showDiplomaSubmenu && <span> / DIPLOMA PROGRAMMES</span>}
        {showManagementSubmenu && <span> / MANAGEMENT & BUSINESS STUDIES</span>}
      </div>
    </header>
  );
};

export default Navbar;
