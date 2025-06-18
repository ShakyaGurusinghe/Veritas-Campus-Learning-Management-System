import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const AddAssignmentPage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    visibility: 'public',
    dueDate: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log('[DEBUG-FRONTEND] File selected:', {
      name: selectedFile?.name,
      type: selectedFile?.type,
      size: selectedFile?.size,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.dueDate) {
      setError('Title and deadline are required');
      console.log('[DEBUG-FRONTEND] Validation failed: Title or dueDate missing');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('visibility', formData.visibility);
    data.append('deadline', formData.dueDate);
    if (file) {
      data.append('file', file);
    }

    const formDataEntries = {};
    for (const [key, value] of data.entries()) {
      formDataEntries[key] = value instanceof File ? `${value.name} (${value.size} bytes)` : value;
    }
    console.log('[DEBUG-FRONTEND] FormData content:', formDataEntries);

    try {
      const url = `/api/instructor/assignments/${moduleId}`;
      console.log('[DEBUG-FRONTEND] Sending request:', {
        url,
        method: 'POST',
        moduleId,
        timestamp: new Date().toISOString(),
      });

      const response = await fetch(url, {
        method: 'POST',
        body: data,
      });

      console.log('[DEBUG-FRONTEND] Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        url: response.url,
      });

      const text = await response.text();
      console.log('[DEBUG-FRONTEND] Raw response text:', text.substring(0, 200) + (text.length > 200 ? '...' : ''));

      let result;
      try {
        result = JSON.parse(text);
        console.log('[DEBUG-FRONTEND] Parsed JSON response:', result);
      } catch (parseError) {
        console.error('[DEBUG-FRONTEND] JSON parse error:', parseError.message);
        throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
      }

      if (!response.ok) {
        console.log('[DEBUG-FRONTEND] HTTP error:', {
          status: response.status,
          error: result.error,
        });
        throw new Error(result.error || `HTTP ${response.status}: Failed to create assignment`);
      }

      console.log('[DEBUG-FRONTEND] Assignment added successfully:', result);
      navigate(`/instructor/modules/${moduleId}`);
    } catch (error) {
      console.error('[DEBUG-FRONTEND] Error adding assignment:', error.message);
      setError(error.message || 'Failed to create assignment. Please try again.');
      if (error.message.includes('Invalid module ID')) {
        setTimeout(() => {
          navigate('/instructor/modules');
        }, 2000);
      }
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
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

        <div className="mb-3">
          <label htmlFor="file" className="form-label">Upload File (Optional)</label>
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
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Save & Publish</button>
      </form>
    </div>
  );
};

export default AddAssignmentPage;