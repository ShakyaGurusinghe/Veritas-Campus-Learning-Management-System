import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SupportDesk.css"; // Import the CSS

function SupportDesk() {
  const navigate = useNavigate();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSupportClick = () => {
    navigate("/support-request");
  };

  const handleViewRequestsClick = () => {
    navigate("/support-list");
  };

  const handleAdminClick = () => {
    setShowAdminModal(true);
  };

  const handleAdminAccess = (e) => {
    e.preventDefault();
    // Simple password check - in a real application, you would use proper authentication
    if (adminPassword === "admin123") {
      setShowAdminModal(false);
      setAdminPassword("");
      setErrorMessage("");
      navigate("/admin/support");
    } else {
      setErrorMessage("Invalid password");
    }
  };

  return (
    <div className="support-desk-container">
      <h1 className="support-desk-title">
        Welcome to the Student Support Desk
      </h1>
      <p className="support-desk-description">
        The Student Support Desk is here to assist you with any academic,
        technical, or personal concerns you may have during your time at the
        university. Whether you're facing issues with your courses, need IT
        assistance, or simply want to connect with student services, we're here
        to help. Submit a request, and our support team will get back to you as
        soon as possible.
      </p>
      <div className="support-desk-buttons">
        <Button variant="primary" onClick={handleSupportClick}>
          Submit a Support Request
        </Button>
        <Button variant="secondary" onClick={handleViewRequestsClick}>
          View Requests
        </Button>
      </div>

      {/* Admin Access Modal */}
      <Modal
        show={showAdminModal}
        onHide={() => setShowAdminModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Admin Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdminAccess}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Admin Password</Form.Label>
              <Form.Control
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Password"
                required
              />
              {errorMessage && (
                <div className="text-danger mt-2">{errorMessage}</div>
              )}
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={() => setShowAdminModal(false)}
                className="me-2"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ backgroundColor: "#8BC34A", borderColor: "#8BC34A" }}
              >
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SupportDesk;