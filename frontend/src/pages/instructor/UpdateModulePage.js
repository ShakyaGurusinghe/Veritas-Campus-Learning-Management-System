import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';

const UpdateModulePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const year = queryParams.get('year') || '';
  const semester = queryParams.get('semester') || '';

  const [moduleData, setModuleData] = useState({
    title: '',
    description: '',
    week: '',
    year: '',
    semester: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        console.log(`Fetching module with ID: ${id}`);
        const response = await fetch(`http://localhost:5000/api/instructor/modules/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Received non-JSON response from server');
        }
        const data = await response.json();
        console.log('Fetched module:', data);
        setModuleData({
          title: data.title || '',
          description: data.description || '',
          week: data.week?.toString() || '',
          year: data.year?.toString() || '',
          semester: data.semester?.toString() || '',
        });
      } catch (error) {
        console.error('Error fetching module:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  const handleChange = (e) => {
    setModuleData({ ...moduleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!moduleData.year || !moduleData.semester) {
      setError('Year and Semester are required');
      return;
    }
    try {
      console.log('Updating module:', moduleData);
      const response = await fetch(`http://localhost:5000/api/instructor/modules/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...moduleData,
          week: parseInt(moduleData.week),
          year: parseInt(moduleData.year),
          semester: parseInt(moduleData.semester),
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      await response.json();
      const query = new URLSearchParams();
      query.set('year', moduleData.year);
      query.set('semester', moduleData.semester);
      console.log(`Navigating to /instructor/modules?${query.toString()}`);
      navigate(`/instructor/modules?${query.toString()}`);
    } catch (error) {
      console.error('Error updating module:', error);
      setError(`Failed to update module: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="container my-5">Loading module...</div>;
  }

  if (error) {
    return <div className="container my-5">Error: {error.message}</div>;
  }

  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/instructor/years">Year Display</Link></li>
          {year && (
            <li className="breadcrumb-item">
              <Link to={`/instructor/semesters?year=${year}`}>Semester Display</Link>
            </li>
          )}
          {year && semester && (
            <li className="breadcrumb-item">
              <Link to={`/instructor/modules?year=${year}&semester=${semester}`}>Module Display</Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">Update Module</li>
        </ol>
      </nav>

      <div className="mx-auto p-4 bg-white rounded shadow" style={{ maxWidth: '700px' }}>
        <h2 className="mb-4 text-success">Update Module</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              id="title"
              name="title"
              value={moduleData.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Module Title"
              required
            />
            <label htmlFor="title">Module Title <span className="text-danger">*</span></label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              id="description"
              name="description"
              value={moduleData.description}
              onChange={handleChange}
              className="form-control"
              placeholder="Module Description"
              style={{ height: '120px' }}
              required
            ></textarea>
            <label htmlFor="description">Description <span className="text-danger">*</span></label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              id="week"
              name="week"
              value={moduleData.week}
              onChange={handleChange}
              className="form-control"
              placeholder="Week Number"
              required
            />
            <label htmlFor="week">Week <span className="text-danger">*</span></label>
          </div>

          <div className="form-floating mb-3">
            <select
              id="year"
              name="year"
              value={moduleData.year}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <label htmlFor="year">Year <span className="text-danger">*</span></label>
          </div>

          <div className="form-floating mb-4">
            <select
              id="semester"
              name="semester"
              value={moduleData.semester}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            <label htmlFor="semester">Semester <span className="text-danger">*</span></label>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success px-4 py-2 fw-semibold">
              Update Module
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModulePage;
