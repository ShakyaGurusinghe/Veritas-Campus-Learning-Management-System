import React, { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SuccessfullyRequest.css";
import "./SuccessfullyRequestResponsive.css";

function SuccessfullyRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentName, requestId } = location.state || {};

  useEffect(() => {
    // If someone tries to access this page directly without submitting a form,
    // redirect them to the support form
    if (!studentName || !requestId) {
      navigate("/support-request");
    }
  }, [studentName, requestId, navigate]);

  return (
    <Container className="success-container d-flex justify-content-center align-items-center">
      <Card
        className="success-card p-4 shadow-sm fade-in-up"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
            </div>
          </div>
        </div>
        <h4 className="text-center mb-3 text-success">
          Request Submitted Successfully!
        </h4>
        <p className="text-center mb-4">
          Thank you, <strong>{studentName}</strong>! Your request has been
          successfully submitted. Our support team will review it shortly.
        </p>
        <p className="text-muted text-center small mb-4">
          Request ID: {requestId}
          <br />
          You can expect a response within two working days.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/support-list" className="btn btn-primary">
            View My Requests
          </Link>
          <Link to="/supportdesk" className="btn btn-outline-secondary">
            Back to Support Desk
          </Link>
        </div>
      </Card>
    </Container>
  );
}

export default SuccessfullyRequest;