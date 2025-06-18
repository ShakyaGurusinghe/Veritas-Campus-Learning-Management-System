import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';

const UpdateLectureMaterial = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [course, setCourse] = useState({ name: '', code: '' });

  useEffect(() => {
    // Fetch lecture material data
    axios.get(`/api/instructor/lecture-material/${id}`)
      .then(res => {
        setForm(res.data);
        return axios.get(`/api/courses/${res.data.courseId}`);
      })
      .then(res => setCourse(res.data))
      .catch(err => console.error('Error fetching data:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setForm({ ...form, file: droppedFile });
  };

  const removeFile = () => {
    setForm({ ...form, file: null });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/instructor/lecture-material/${id}`, form);
      alert('Updated successfully');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* <Header /> */}

      <div className="container my-4 flex-grow-1">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/programmes">Programmes</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Update</li>
          </ol>
        </nav>

        {/* Page Title */}
        <h3 style={{ color: '#55B649' }} className="fw-bold mb-3">
          Update Lecture Material - {course.code} {course.name && `(${course.name})`}
        </h3>

        {/* Form Container */}
        <form onSubmit={handleUpdate}>
          <div className="p-4" style={{ backgroundColor: '#fff8dc', borderRadius: '10px' }}>
            <div className="row justify-content-start">
              <div className="col-md-8 mb-3">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={form.title || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-8 mb-3">
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={form.date || ''}
                  onChange={handleChange}
                />
              </div>

              {/* Drag-and-drop Upload with Remove Option */}
              <div
                className="col-md-0 mb-3 p-4 text-center border"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{ borderStyle: 'dashed', borderColor: '#ccc', backgroundColor: '#f9f9f9', borderRadius: '8px' }}
              >
                <p className="mb-2">Drag & drop your file here</p>
                <p className="text-muted">or select below</p>
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
                {form.file && (
                  <div className="mt-2 d-flex justify-content-between align-items-center px-2 bg-light border rounded">
                    <span className="text-success">{form.file.name}</span>
                    <i className="fas fa-trash-alt text-danger ms-3" style={{ cursor: 'pointer' }} onClick={removeFile}/>

                  </div>
                )}
              </div>

              <div className="col-md-8 mb-3">
                <label className="form-label me-3">Visibility:</label>
                <br />
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="visibility"
                    value="Public"
                    checked={form.visibility === 'Public'}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">Public</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="visibility"
                    value="Private"
                    checked={form.visibility === 'Private'}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label">Private</label>
                </div>
              </div>
            </div>

            {/* Submit Button aligned to bottom-right */}
            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-success px-4">Update</button>
            </div>
          </div>
        </form>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default UpdateLectureMaterial;
