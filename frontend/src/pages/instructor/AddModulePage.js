import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddModulePage = () => {
  const [moduleData, setModuleData] = useState({
    title: '',
    description: '',
    week: '',
    // Add other fields as needed (e.g., module code, credits, etc.)
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setModuleData({ ...moduleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Adding new module:', moduleData);
    // Example API call:
    try {
      const response = await fetch('/api/instructor/modules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moduleData),
      });
      if (!response.ok) {
        // Attempt to read error response if available
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      const newModule = await response.json();
      console.log('Module added successfully:', newModule);
      // Assuming the modules list is at /modules or similar
      navigate('/modules'); // Navigate back to modules list after adding
    } catch (error) {
      console.error('Error adding module:', error);
      // Optionally set an error state for the user to see
      alert(`Failed to add module: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/modules">Module Display</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add New Module</li>
        </ol>
      </nav>

      <h1>Add New Module</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group mb-3">
          <label htmlFor="title">Module Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={moduleData.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={moduleData.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="week">Week</label>
          <input
            type="number"
            id="week"
            name="week"
            value={moduleData.week}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        {/* Add more form fields for other module details here */}

        <button type="submit" className="btn btn-primary mt-3">Add Module</button>
      </form>
    </div>
  );
};

export default AddModulePage; 