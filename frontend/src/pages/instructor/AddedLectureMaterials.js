import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const AddedLectureMaterials = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [filter, setFilter] = useState('');
  const [course, setCourse] = useState({ name: '', code: '' });

  useEffect(() => {
    // ✅ Fetch lecture materials
    axios
      .get(`http://localhost:5000/api/instructor/lecturematerial/${courseId}`)
      .then(res => setMaterials(res.data))
      .catch(err => console.error('Error fetching materials:', err));

    // ✅ Optional: Fetch course info if you enable it later
    // axios
    //   .get(`/api/courses/${courseId}`)
    //   .then(res => setCourse(res.data))
    //   .catch(err => console.error('Error fetching course info:', err));
  }, [courseId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/instructor/lecturematerial/${courseId}`);
      setMaterials(prev => prev.filter(mat => mat._id !== id));
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const filteredData = materials.filter(item =>
    item.title.toLowerCase().includes(filter.toLowerCase()) ||
    item.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3 style={{ color: '#55B649' }}>
        Added Lecture Materials {course.code && `- ${course.code}`} {course.name && `(${course.name})`}
      </h3>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by title or description..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-end">
          <Link to={`http://localhost:5000/api/instructor/lecturematerial/${courseId}`} className="btn btn-success">
            + Add Lecture Material
          </Link>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Week</th>
            <th>Title</th>
            <th>Description</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.week}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <a href={`/${item.fileUrl}`} target="_blank" rel="noreferrer">View</a>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No lecture materials found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddedLectureMaterials;
