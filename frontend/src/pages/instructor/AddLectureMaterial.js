import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Alert, Spinner } from 'react-bootstrap';

const AddLectureMaterial = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
    week: '',
    visibility: 'Public',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFormData({ ...formData, file: acceptedFiles[0] });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'image/*': [],
    },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/instructor/lecturematerial/', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (response.data) {
        navigate('/instructor/added-lecture-materials/:courseId', {
          state: {
            lectureName: formData.title,
            requestId: response.data.data_id,
          },
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting lecture material');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white bg-opacity-75" style={{ zIndex: 1050 }}>
          <Spinner animation="border" variant="primary" role="status" style={{ width: '3rem', height: '3rem' }} />
          <div className="mt-3 text-primary fw-medium">Submitting lecture material...</div>
        </div>
      )}
      <div className="container my-5">
        <div className="mx-auto p-4 bg-white rounded shadow" style={{ maxWidth: "900px" }}>
          <h2 style={{ color: '#55B649' }}>Add New Lecture Material</h2>

          {error && (
            <Alert ref={errorRef} variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Lecture Title"
                    onChange={handleChange}
                    value={formData.title}
                    disabled={isSubmitting}
                    required
                  />
                  <label htmlFor="title">Title<span className="text-danger fw-bold">*</span></label>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <select
                    id="visibility"
                    name="visibility"
                    className="form-select"
                    value={formData.visibility}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                  <label htmlFor="visibility">Visibility</label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="form-floating">
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.description}
                  disabled={isSubmitting}
                  style={{ height: "120px" }}
                  required
                ></textarea>
                <label htmlFor="description">Description<span className="text-danger fw-bold">*</span></label>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Upload File <span className="text-danger fw-bold">*</span></label>
              <div
                {...getRootProps()}
                className={`border border-2 rounded p-3 text-center bg-light ${isSubmitting ? 'opacity-50' : 'border-secondary hover:border-primary bg-white'}`}
                style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                <input {...getInputProps()} disabled={isSubmitting} />
                {isDragActive ? (
                  <p className="mb-0">Drop the file here...</p>
                ) : formData.file ? (
                  <p className="mb-0">{formData.file.name}</p>
                ) : (
                  <p className="mb-0">Drag & drop a file here, or click to select</p>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button
                type="submit"
                className="btn btn-success px-4 py-2 fw-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddLectureMaterial;
