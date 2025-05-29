import React from "react";

const Footer = () => {
  return (
    <footer className="text-white w-100 mt-5" style={{ backgroundColor: "#55B649", fontFamily: "'Poppins', sans-serif" }}>
      <div className="container text-center py-4">
        <p className="fw-bold fs-5">GET SOCIAL WITH US</p>
        <div className="mb-3">
          <a href="https://www.facebook.com/share/16MpQD7PUv/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a href="https://www.instagram.com/veritasinternationalcampus?igsh=eHhmbmxnZG0xejM" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a href="https://www.tiktok.com/@veritas_campus?_t=ZS-8vDSKIsf8Cm&_r=1" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="fab fa-tiktok fa-lg"></i>
          </a>
          <i className="fab fa-linkedin fa-lg mx-2"></i>
        </div>

        <div className="row text-center small">
          <div className="col-12 col-md-4 mb-2">Address: 676/1 Colombo - Galle Main Rd, Panadura</div>
          <div className="col-12 col-md-4 mb-2">Phone: (+94) 77 479 5371</div>
          <div className="col-12 col-md-4">
            Email:{" "}
            <a href="mailto:info.veritascampus@gmail.com" className="text-white text-decoration-underline">
              info.veritascampus@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#3E9355", padding: "10px 0", fontSize: "0.85rem", fontWeight: "500" }}>
        <div className="text-center container">
          © 2025 Veritas International. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
