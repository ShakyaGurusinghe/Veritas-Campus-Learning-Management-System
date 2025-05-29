import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Assuming you'll need a CSS file for styling this page
// import '../../css/AssignmentDisplayPage.css';

const AssignmentDisplayPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // Assuming the backend endpoint to get all assignments is /api/instructor/assignments
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
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div className="container mt-4 mb-5">Loading assignments...</div>;
  }

  if (error) {
    return <div className="container mt-4 mb-5">Error loading assignments: {error.message}</div>;
  }

  return (
    <div className="container mt-4 mb-5">

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          {/* Add more breadcrumb items as needed based on your site structure */}
          <li className="breadcrumb-item active" aria-current="page">Assignments</li>
        </ol>
      </nav>

      <h1>Assignments</h1>

      <div className="row mb-3">
        <div className="col-12 text-end">
          {/* Link to the Add Assignment page - we'll create this route next */}
          <Link to="/instructor/modules/${moduleId}/assignments/add" className="btn btn-success">Add New Assignment</Link>
        </div>
      </div>

      <div className="row">
        {/* Display assignments here */}
        {assignments.length > 0 ? (
          assignments.map(assignment => (
            <div key={assignment._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  {/* Display assignment details - adjust based on your assignment model */}
                  <h5 className="card-title">{assignment.title || 'Unnamed Assignment'}</h5>
                  {/* Add more assignment details here, e.g., due date, associated module, etc. */}
                  {/* <p className="card-text">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p> */}
                  {/* <p className="card-text">Module: {assignment.module?.title || 'N/A'}</p> */}

                  {/* Link to the Assignment Performance page */}
                  <Link to={`/instructor/assignments/${assignment._id}/performance`} className="btn btn-primary">View Performance</Link>

                  {/* Placeholder for Edit and Delete buttons - will add functionality later */}
                  {/* <button className="btn btn-secondary btn-sm ms-2">Edit</button> */}
                  {/* <button className="btn btn-danger btn-sm ms-2">Delete</button> */}
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