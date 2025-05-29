import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import '../../css/EditAssignmentPage.css'; // We can create this later

const EditAssignmentPage = () => {
  const { moduleId, assignmentId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    // file: null, // File handling might require different approach
    visibility: 'public', // Default to public
    dueDate: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        // Fetch the module to get the assignment details from its assignments array
        const response = await fetch(`/api/instructor/modules/${moduleId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const moduleData = await response.json();

        // Find the specific assignment within the module
        const assignment = moduleData.assignments.find(assign => assign._id === assignmentId);

        if (!assignment) {
          throw new Error('Assignment not found');
        }

        // Format the dueDate for the date input (YYYY-MM-DD)
        const formattedDueDate = assignment.dueDate ? new Date(assignment.dueDate).toISOString().split('T')[0] : '';

        setFormData({
          title: assignment.title || '',
          description: assignment.description || '',
          // file: null, // File handling placeholder
          visibility: assignment.visibility || 'public',
          dueDate: formattedDueDate,
        });

      } catch (error) {
        console.error('Error fetching assignment details:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentDetails();
  }, [moduleId, assignmentId]); // Rerun effect if moduleId or assignmentId changes

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? (checked ? value : formData[name]) : value,
    });
  };

  const handleFileChange = (e) => {
    // Handle file selection - placeholder for now
    console.log('File selected:', e.target.files[0]);
    // setFormData({...formData, file: e.target.files[0]});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updating assignment:', formData);

    // Implement API call to backend to update assignment
    try {
      // Note: The backend route will need to handle updating a subdocument
      const response = await fetch(`/api/instructor/modules/${moduleId}/assignments/${assignmentId}`, {
        method: 'PUT', // Use PUT for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send updated form data as JSON
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }

      const result = await response.json();
      console.log('Assignment updated successfully:', result);
      // Redirect back to the module details page after successful update
      navigate(`/instructor/modules/${moduleId}`);

    } catch (error) {
      console.error('Error updating assignment:', error);
      // Optionally display error message to the user
    }
  };

  if (loading) {
    return <div className="container mt-4 mb-5">Loading assignment details...</div>;
  }

  if (error) {
    return <div className="container mt-4 mb-5">Error: {error.message}</div>;
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          {/* Add more breadcrumb items as needed */}
           <li className="breadcrumb-item"><Link to={`/instructor/modules/${moduleId}`}>Module Details</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Update Assignment</li>
        </ol>
      </nav>

      <h1>Update Assignment</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
          ></textarea>
        </div>

        {/* File Upload - Placeholder */}
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Upload File</label>
          <input
            type="file"
            className="form-control"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>

        {/* Visibility */}
        <div className="mb-3">
          <label className="form-label">Visibility</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="visibility"
              id="publicVisibility"
              value="public"
              checked={formData.visibility === 'public'}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="publicVisibility">
              Public
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="visibility"
              id="privateVisibility"
              value="private"
              checked={formData.visibility === 'private'}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="privateVisibility">
              Private
            </label>
          </div>
        </div>

        {/* Deadline */}
         <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Deadline</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditAssignmentPage; 