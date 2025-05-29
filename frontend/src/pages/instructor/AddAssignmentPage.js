import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import '../../css/AddAssignmentPage.css'; // We can create this later

const AddAssignmentPage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    // file: null, // File handling might require different approach
    visibility: 'public', // Default to public
    dueDate: '',
  });
  const [error, setError] = useState(null);

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
    setError(null);
    console.log('Submitting assignment:', formData);

    try {
      const response = await fetch(`/api/instructor/modules/${moduleId}/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create assignment');
      }

      console.log('Assignment added successfully:', data);
      
      // Navigate back to the module details page after successful creation
      navigate(`/instructor/modules/${moduleId}`);

    } catch (error) {
      console.error('Error adding assignment:', error);
      setError(error.message || 'Failed to create assignment. Please try again.');
      
      // If the error is due to invalid module ID, redirect to modules list
      if (error.message.includes('Invalid module ID')) {
        setTimeout(() => {
          navigate('/instructor/modules');
        }, 2000);
      }
    }
  };

  return (
    <div className="container mt-4 mb-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          {/* Add more breadcrumb items as needed */}
           <li className="breadcrumb-item"><Link to={`/instructor/modules/${moduleId}`}>Module Details</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add New Assignment</li>
        </ol>
      </nav>

      <h1>Add New Assignment</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

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

        <button type="submit" className="btn btn-success">Save & Publish</button>
      </form>
    </div>
  );
};

export default AddAssignmentPage; 