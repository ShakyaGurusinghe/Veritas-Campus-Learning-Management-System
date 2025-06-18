import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EditAssignmentPage = () => {
  const { moduleId, assignmentId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'public',
    dueDate: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const response = await fetch(`/api/instructor/assignments/${assignmentId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const assignment = await response.json();

        const formattedDueDate = assignment.deadline
          ? new Date(assignment.deadline).toISOString().split('T')[0]
          : '';

        setFormData({
          title: assignment.title || '',
          description: assignment.description || '',
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
  }, [assignmentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('visibility', formData.visibility);
      data.append('deadline', formData.dueDate);
      if (file) {
        data.append('file', file);
      }

      const response = await fetch(`/api/instructor/assignments/${assignmentId}`, {
        method: 'PUT',
        body: data,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }

      const result = await response.json();
      console.log('Assignment updated successfully:', result);
      navigate(`/instructor/modules/${moduleId}`);
    } catch (error) {
      console.error('Error updating assignment:', error);
      setError(error.message || 'Failed to update assignment');
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
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
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