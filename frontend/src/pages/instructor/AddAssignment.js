// src/pages/instructor/AddAssignment.js
import React, { useState, useEffect } from 'react';
import '../../css/AddAssignment.css';
import axios from 'axios';
import Button from '../../components/Button';
import SuccessModal from '../../components/SuccessModal';
import { useNavigate } from 'react-router-dom';

const AddAssignment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
    visibility: 'Public',
    deadline: '',
    moduleId: '',
  });

  const [assignments, setAssignments] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fetch all assignments and modules on component mount
  useEffect(() => {
    fetchAssignments();
    fetchModules();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/instructor/assignments');
      setAssignments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setLoading(false);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/instructor/modules');
      setModules(response.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.moduleId) {
      alert('Please select a module');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('file', formData.file);
    data.append('visibility', formData.visibility);
    
    // Convert local time to UTC
    const localDate = new Date(formData.deadline);
    const utcDate = new Date(Date.UTC(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      localDate.getHours(),
      localDate.getMinutes()
    ));
    
    data.append('deadline', utcDate.toISOString());

    try {
      await axios.post(`http://localhost:5000/api/instructor/assignments/${formData.moduleId}`, data);
      setShowModal(true);
      // Refresh assignments list after adding new one
      fetchAssignments();
      // Reset form
      setFormData({
        title: '',
        description: '',
        file: null,
        visibility: 'Public',
        deadline: '',
        moduleId: '',
      });
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    }
  };

  const handleViewAll = () => {
    setShowModal(false);
    setTimeout(() => {
      navigate('/instructor/added-assignment');
    }, 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="add-assignment">
      <h2>Add New Assignments</h2>
      
      {/* Add Assignment Form */}
      <form onSubmit={handleSubmit} className="assignment-form">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} value={formData.title} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} value={formData.description} required />
        
        {/* Module Selection */}
        <select 
          name="moduleId" 
          onChange={handleChange} 
          value={formData.moduleId}
          required
        >
          <option value="">Select a Module</option>
          {modules.map((module) => (
            <option key={module._id} value={module._id}>
              {module.title} (Week {module.week}, Year {module.year}, Semester {module.semester})
            </option>
          ))}
        </select>
        
        <input type="file" name="file" onChange={handleChange} />
        <div className="visibility">
          <label>
            <input type="radio" name="visibility" value="Public" checked={formData.visibility === 'Public'} onChange={handleChange} />
            Public
          </label>
          <label>
            <input type="radio" name="visibility" value="Private" onChange={handleChange} />
            Private
          </label>
        </div>
        <input 
          type="datetime-local" 
          name="deadline" 
          onChange={handleChange} 
          value={formData.deadline}
          min={new Date().toISOString().slice(0, 16)}
          required 
        />
        <Button text="Save & Publish" onClick={handleSubmit} />
      </form>

      {/* Display All Assignments */}
      <div className="assignments-list">
        <h3>All Assignments</h3>
        {loading ? (
          <p>Loading assignments...</p>
        ) : assignments.length > 0 ? (
          <div className="assignments-grid">
            {assignments.map((assignment) => (
              <div key={assignment._id} className="assignment-card">
                <h4>{assignment.title}</h4>
                <p><strong>Description:</strong> {assignment.description || 'No description'}</p>
                <p><strong>Deadline:</strong> {formatDate(assignment.deadline)}</p>
                <p><strong>Visibility:</strong> {assignment.visibility}</p>
                <p><strong>Module:</strong> {assignment.moduleId?.title || 'N/A'}</p>
                {assignment.fileUrl && (
                  <p><strong>File:</strong> {assignment.fileUrl}</p>
                )}
                <div className="assignment-actions">
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate(`/instructor/edit-assignment/${assignment._id}`)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this assignment?')) {
                        try {
                          await axios.delete(`http://localhost:5000/api/instructor/assignments/${assignment._id}`);
                          fetchAssignments(); // Refresh list
                        } catch (error) {
                          console.error('Error deleting assignment:', error);
                          alert('Failed to delete assignment');
                        }
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No assignments found.</p>
        )}
      </div>

      {showModal && (
        <SuccessModal
          message="Assignment uploaded successfully!"
          onClose={() => setShowModal(false)}
          onViewAll={handleViewAll}
        />
      )}
    </div>
  );
};

export default AddAssignment;