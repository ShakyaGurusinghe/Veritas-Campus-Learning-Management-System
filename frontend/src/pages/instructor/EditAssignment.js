// src/pages/instructor/EditAssignment.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/EditAssignment.css';
import SuccessModal from '../../components/SuccessModal';
import Button from '../../components/Button';

const EditAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    visibility: 'Public',
    file: null,
    fileUrl: '',
  });

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/instructor/assignments/${id}`);
        const { title, description, deadline, visibility, fileUrl } = res.data;
        setFormData({
          title,
          description,
          deadline: deadline ? new Date(deadline).toISOString().slice(0, 16) : '',
          visibility,
          file: null,
          fileUrl
        });
      } catch (error) {
        console.error('Failed to load assignment:', error);
      }
    };

    fetchAssignment();
  }, [id]);

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

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
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

    if (formData.file) {
      data.append('file', formData.file);
    }

    try {
      await axios.put(`http://localhost:5000/api/instructor/assignments/${id}`, data);
      setShowModal(true);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Update failed');
    }
  };

  const handleViewAll = () => {
    setShowModal(false);
    navigate('/instructor/added-assignment');
  };

  return (
    <div className="edit-assignment">
      <h2>Edit Assignment</h2>
      <form onSubmit={handleSubmit} className="assignment-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          min={new Date().toISOString().slice(0, 16)}
          required
        />

        <div className="visibility">
          <label>
            <input
              type="radio"
              name="visibility"
              value="Public"
              checked={formData.visibility === 'Public'}
              onChange={handleChange}
            />
            Public
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="Private"
              checked={formData.visibility === 'Private'}
              onChange={handleChange}
            />
            Private
          </label>
        </div>

        {formData.fileUrl && (
          <div className="current-file">
            <p>Current File:</p>
            <a
              href={`http://localhost:5000/uploads/${formData.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="file-preview"
            >
              {formData.fileUrl}
            </a>
          </div>
        )}

        <input type="file" name="file" onChange={handleChange} />

        <Button text="Update Assignment" onClick={handleSubmit} />
      </form>

      {showModal && (
        <SuccessModal
          message="Assignment updated successfully!"
          onClose={() => setShowModal(false)}
          onViewAll={handleViewAll}
        />
      )}
    </div>
  );
};

export default EditAssignment;