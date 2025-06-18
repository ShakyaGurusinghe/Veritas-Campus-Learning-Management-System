import React, {useEffect} from "react";
import { Container, Card } from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";

function SucessRequest() {
    const location = useLocation();
    const navigate = useNavigate();
    const {lectureName, requestId} = location.state || {};

    useEffect(() => {
        if(!lectureName || !requestId) {
            navigate('/instructor/sucess-request');
        }
    }, [lectureName, requestId, navigate]);

    return (
        <>
        <Container className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <Card className="p-4 shadow-sm w-100" style={{ maxWidth: '600px' }}>
                <div className="text-center mb-4">
                    <div className="rounded-circle bg-success bg-opacity-25 d-inline-flex align-items-center justify-content-center" style={{ width: 80, height: 80 }}>
                        <i className="bi bi-check2-circle text-success fs-1"></i>
                    </div>
                </div>
                <h4 className="text-center text-success mb-3">Request Submitted Successfully!</h4>
                <p className="text-center mb-4">
                Thank you, <strong>{lectureName}</strong>! Your request has been successfully submitted.
                Our support team will review it shortly.
                </p>

                <p className="text-muted text-center small mb-4">
                Request ID: <strong>{requestId}</strong><br />
                You can expect a response within two working days.
                </p>

                <div className="d-flex justify-content-center gap-3">
                <Link to="/instructor/support-list" className="btn btn-success">
                    <i className="bi bi-plus-circle me-2"></i>   View My Requests
                </Link>
                <Link to="/instructor/instructor-dashboard" className="btn btn-outline-secondary">
                    Back to Dashboard
                </Link>
                </div>
            </Card>
        </Container>
        </>
    );
};

export default SucessRequest;