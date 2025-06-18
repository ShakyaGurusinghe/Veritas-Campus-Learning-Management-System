import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Modal, Button, Alert, Spinner, Card, Row, Col, Badge, Container, Form, InputGroup } from 'react-bootstrap';

const SupportList = () => {
    const [supportRequests, setSupportRequests] = useState([]);
    const [selectedRequest, setSelectedRequests] = useState(null);
    const [showModel, setShowModel] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchSupportsRequests = async () => {
        try{
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/instructor/support');
            setSupportRequests(res.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch support requests. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSupportsRequests();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this request?')){
            try {
                await axios.delete(`http://localhost:5000/api/instructor/support/${id}`);
                setSuccess('Support request deleted successfully!');
                setTimeout(() => setSuccess(''), 3000);
                fetchSupportsRequests();
            } catch (error) {
                setError('Failed to delete request.');
            }
        }
    };

    const handleView = (request) => {
        setSelectedRequests(request);
        setShowModel(true);
    };

    const formatDate = (dateString) => {
        const options = {
            year : 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit' 
        };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    const formatRelativeTime = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInMs = now - date;
        const diffInSecs = Math.floor(diffInMs / 1000);
        const diffInMins = Math.floor(diffInSecs / 60);
        const diffInHours = Math.floor(diffInMins / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInSecs < 60) {
            return 'just now';
        } else if (diffInMins < 60) {
            return `${diffInMins} ${diffInMins === 1 ? 'minute' : 'minutes'} ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
        } else if (diffInDays < 7) {
            return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
        } else {
            return formatDate(dateString);
        }
    };

    const getStatusBadge = (status) => {
        return status === 'pending'
        ? <Badge bg="warning" className="status-badge">Pending</Badge>
        : <Badge bg="success" className="status-badge">Replied</Badge>;
    };

    const filteredAndSearchedRequests = supportRequests
        .filter(req => filter === 'all' || req.status === filter)
        .filter(req => {
            if (!searchTerm.trim()) 
                return true;
        
        const term = searchTerm.toLowerCase();
        return (
            req.lectureName.toLowerCase().includes(term) ||
            req.lectureID.toLowerCase().includes(term) ||
            req.issue.toLowerCase().includes(term) ||
            req.email.toLowerCase().includes(term)
        );
    });

    return(
        <>
        <Container fluid className="py-4">
        {/* Header */}
        <div className="text-center mb-4">
                <h3 style={{ color: '#55B649' }}>Support Request Dashboard</h3>
            <p className="text-muted">Track and manage all your support interactions in one place</p>
        </div>

        {/* Actions */}
        <Row className="align-items-center mb-4">
            <Col lg={4} md={6} sm={12}>
            <InputGroup>
                <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                <Form.Control
                type="text"
                placeholder="Search by name, ID, or issue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </InputGroup>
        </Col>

            <Col lg={5} md={6} sm={12} className="mt-3 mt-md-0">
            <div className="d-flex flex-wrap gap-2">
                <Button variant={filter === 'all' ? 'primary' : 'outline-primary'} onClick={() => setFilter('all')}>
                <i className="bi bi-funnel-fill me-2"></i> All
                </Button>
                <Button variant={filter === 'pending' ? 'warning' : 'outline-warning'} onClick={() => setFilter('pending')}>
                <i className="bi bi-hourglass-split me-2"></i> Pending
                </Button>
                <Button variant={filter === 'replied' ? 'success' : 'outline-success'} onClick={() => setFilter('replied')}>
                <i className="bi bi-check-circle-fill me-2"></i> Replied
                </Button>
            </div>
            </Col>

            <Col lg={3} className="text-lg-end text-center mt-3 mt-lg-0">
            <Link to="/instructor/supportform" className="btn btn-success">
                <i className="bi bi-plus-circle me-2"></i>  Add New Request
            </Link>
            </Col>
        </Row>

        {/* Alerts */}
        {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
            <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
            </Alert>
        )}
        {success && (
            <Alert variant="success" dismissible onClose={() => setSuccess('')}>
            <i className="bi bi-check-circle-fill me-2"></i>{success}
            </Alert>
        )}

        {/* Content Area */}
        {loading ? (
            <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading your support requests...</p>
            </div>
        ) : filteredAndSearchedRequests.length === 0 ? (
            <div className="text-center text-muted my-5">
            <div className="display-4 text-secondary mb-3"><i className="bi bi-inbox"></i></div>
            <h4>No Support Requests Found</h4>
            <p>
                {searchTerm
                ? "No results match your search criteria. Try different keywords."
                : filter !== 'all'
                    ? `You don't have any ${filter} requests. Try viewing all requests.`
                    : "You haven't submitted any support requests yet."}
            </p>
            </div>
        ) : (
            <Row className="g-4">
            {filteredAndSearchedRequests.map((request) => (
                <Col key={request._id} lg={3} md={4} sm={6}>
                <Card className="h-100 shadow-sm">
                    <Card.Header className="d-flex justify-content-between bg-light">
                    <span><i className="bi bi-hash"></i> {request._id.slice(-6).toUpperCase()}</span>
                    {getStatusBadge(request.status)}
                    </Card.Header>

                    {request.photo && (
                    <div className="position-relative">
                        <Card.Img
                        variant="top"
                        src={`http://localhost:5000/uploads/instructorsupport${request.photo}`}
                        alt="Issue"
                        className="img-fluid"
                        onClick={() => handleView(request)}
                        />
                        <div className="position-absolute top-0 end-0 p-2 text-white bg-dark bg-opacity-50" style={{ cursor: 'pointer' }} onClick={() => handleView(request)}>
                        <i className="bi bi-eye-fill"></i>
                        </div>
                    </div>
                    )}

                    <Card.Body>
                    <Card.Title>{request.lectureName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{request.lectureID}</Card.Subtitle>

                    <p className="fw-bold mb-1">Issue:</p>
                    <Card.Text>{request.issue}</Card.Text>

                    <div className="mb-2"><i className="bi bi-envelope me-2"></i><a href={`mailto:${request.email}`}>{request.email}</a></div>
                    <div className="mb-2"><i className="bi bi-telephone me-2"></i>{request.contactNumber}</div>
                    <div><i className="bi bi-clock me-2"></i><span title={formatDate(request.createdAt)}>{formatRelativeTime(request.createdAt)}</span></div>

                    {request.status === 'replied' && (
                        <div className="mt-3 border-top pt-2">
                        <p className="fw-bold mb-1"><i className="bi bi-reply-fill me-2"></i>Admin Response</p>
                        <p>{request.adminReply.message}</p>
                        <small className="text-muted">By: {request.adminReply.adminName} — {formatRelativeTime(request.adminReply.repliedAt)}</small>
                        </div>
                    )}
                    </Card.Body>

                    <Card.Footer className="d-flex justify-content-between">
                    <Button size="sm" variant="outline-primary" onClick={() => handleView(request)}>
                        <i className="bi bi-eye-fill me-1"></i> View
                    </Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(request._id)}>
                        <i className="bi bi-trash-fill me-1"></i> Delete
                    </Button>
                    </Card.Footer>
                </Card>
                </Col>
            ))}
            </Row>
        )}

        {/* Modal */}
        <Modal show={showModel} onHide={() => setShowModel(false)} size="lg" centered>
            <Modal.Header closeButton>
            <Modal.Title>
                <i className="bi bi-ticket-detailed-fill me-2"></i>Support Request Details
                {selectedRequest && <span className="ms-2">{getStatusBadge(selectedRequest.status)}</span>}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {selectedRequest && (
                <>
                <div className="mb-3">
                    <h5>{selectedRequest.lectureName}</h5>
                    <p className="text-muted">Lecture ID: {selectedRequest.lectureID}</p>
                    <p>Request ID: {selectedRequest._id}</p>
                    <p><i className="bi bi-calendar-event me-1"></i>{formatDate(selectedRequest.createdAt)}</p>
                </div>

                <div className="mb-3">
                    <p><i className="bi bi-envelope me-2"></i><a href={`mailto:${selectedRequest.email}`}>{selectedRequest.email}</a></p>
                    <p><i className="bi bi-telephone me-2"></i>{selectedRequest.contactNumber}</p>
                </div>

                <div className="mb-3">
                    <h6><i className="bi bi-chat-text-fill me-2"></i>Issue Description</h6>
                    <p>{selectedRequest.issue}</p>
                </div>

                {selectedRequest.photo && (
                    <div className="mb-3">
                    <h6>Attached Photo</h6>
                    <img src={`http://localhost:5000/uploads/instructorsupport${selectedRequest.photo}`} alt="Evidence" className="img-fluid rounded" />
                    <a href={`http://localhost:5000/uploads/instructorsupport${selectedRequest.photo}`} target="_blank" rel="noopener noreferrer" className="btn btn-link mt-2">
                        <i className="bi bi-arrows-fullscreen me-1"></i> View Full Image
                    </a>
                    </div>
                )}

                {selectedRequest.status === 'replied' && (
                    <div className="mt-4 border-top pt-3">
                    <h6><i className="bi bi-reply-fill me-2"></i>Admin Response</h6>
                    <p>{selectedRequest.adminReply.message}</p>
                    <small className="text-muted">By: {selectedRequest.adminReply.adminName} at {formatDate(selectedRequest.adminReply.repliedAt)}</small>
                    </div>
                )}
                </>
            )}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModel(false)}>
                <i className="bi bi-x-circle me-2"></i>Close
            </Button>
            {selectedRequest && (
                <Button variant="danger" onClick={() => {
                setShowModel(false);
                handleDelete(selectedRequest._id);
                }}>
                <i className="bi bi-trash-fill me-2"></i>Delete Request
                </Button>
            )}
            </Modal.Footer>
        </Modal>

        {/* Footer */}
        <div className="text-center mt-5">
            <p className="text-muted">Need more help? Contact our support team at <a href="mailto:support@veritascampus.edu">support@veritascampus.edu</a></p>
        </div>
        </Container>
    </>
    );
};

export default SupportList;