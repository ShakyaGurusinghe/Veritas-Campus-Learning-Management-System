import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LectureMaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('/api/admin/lecture-materials')
      .then(res => setMaterials(res.data))
      .catch(err => console.error('Error fetching materials:', err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;
    try {
      await axios.delete(`/api/admin/lecture-material/${id}`);
      setMaterials((prev) => prev.filter((mat) => mat._id !== id));
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
      <h3 style={{ color: '#55B649' }}>Lecture Materials List</h3>

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
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Course</th>
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
                <td>{item.courseId.name}</td>
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

export default LectureMaterialLis;
