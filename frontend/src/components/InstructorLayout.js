import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const InstructorLayout = ({ children, activeLink }) => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            style={{ minHeight: "calc(100vh - 200px)" }}
          >
            <div className="position-sticky pt-3">
              <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Instructor Dashboard</span>
              </h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link
                    to="/instructor/semesters"
                    className={`nav-link ${
                      activeLink === "semesters" ? "active" : ""
                    }`}
                  >
                    <i className="bi bi-calendar-range me-2"></i>
                    Semesters
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/instructor/modules"
                    className={`nav-link ${
                      activeLink === "modules" ? "active" : ""
                    }`}
                  >
                    <i className="bi bi-book me-2"></i>
                    Modules
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/instructor/diploma-years"
                    className={`nav-link ${
                      activeLink === "diploma-years" ? "active" : ""
                    }`}
                  >
                    <i className="bi bi-mortarboard me-2"></i>
                    Diploma Years
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Main content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2" style={{ color: "#55B649" }}>
                {activeLink === "semesters"
                  ? "Semester Management"
                  : activeLink === "modules"
                  ? "Module Management"
                  : "Diploma Year Management"}
              </h1>
            </div>
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InstructorLayout;