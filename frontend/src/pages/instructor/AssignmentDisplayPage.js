import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AssignmentDisplayPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('/api/instructor/assignments');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return <div className="container mt-4 mb-5">Loading assignments...</div>;
  }

  if (error) {
    return <div className="container mt-4 mb-5">Error loading assignments: {error.message}</div>;
  }

  return (
    <div className="container mt-4 mb-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Assignments</li>
        </ol>
      </nav>

      <h1>Assignments</h1>

      <div className="row mb-3">
        <div className="col-12 text-end">
          {/* Use a generic link or require moduleId selection */}
          <Link to="/instructor/modules" className="btn btn-success">Select Module to Add Assignment</Link>
        </div>
      </div>

      <div className="row">
        {assignments.length > 0 ? (
          assignments.map(assignment => (
            <div key={assignment._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{assignment.title || 'Unnamed Assignment'}</h5>
                  <p className="card-text">Due: {new Date(assignment.deadline).toLocaleDateString()}</p>
                  <p className="card-text">Module: {assignment.moduleId?.title || 'N/A'}</p>
                  <Link to={`/instructor/assignments/${assignment._id}/performance`} className="btn btn-primary">View Performance</Link>
                  <Link to={`/instructor/modules/${assignment.moduleId?._id}/assignments/${assignment._id}/edit`} className="btn btn-secondary btn-sm ms-2">Edit</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No assignments found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentDisplayPage;