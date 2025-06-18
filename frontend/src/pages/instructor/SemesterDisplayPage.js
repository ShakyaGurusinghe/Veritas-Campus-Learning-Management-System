import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SemesterDisplayPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const year = queryParams.get('year');
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSemesters = async () => {
      if (!year) {
        setError('Please select a year');
        setLoading(false);
        return;
      }
      try {
        console.log(`Fetching semesters for year: ${year}`);
        // Uncomment when backend API is ready
        // const response = await fetch(`http://localhost:5000/api/instructor/semesters?year=${year}`);
        // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        // const data = await response.json();
        // setSemesters(data.semesters || [1, 2]);
        setSemesters([1, 2]); // Fallback to hardcoded semesters
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSemesters();
  }, [year]);

  if (loading) return <div className="container mt-4">Loading semesters...</div>;
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error}</div>
        <Link to="/instructor/years" className="btn btn-primary">Back to Years</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/programmes">Programmes</Link></li>
          <li className="breadcrumb-item">Diploma Programmes</li>
          <li className="breadcrumb-item">Management & Business Studies</li>
          <li className="breadcrumb-item"><Link to="/instructor/years">Year Display</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Semester Display</li>
        </ol>
      </nav>

      <h3>Semesters for Year {year}</h3>

      <div className="semester-list-container">
        <div className="semester-item mb-3">
          <Link
            to={`/instructor/modules?year=${year}`}
            className="text-decoration-none text-dark"
            onClick={() => console.log(`Navigating to modules for Year ${year}, All Semesters`)}
          >
            <i className="fas fa-chevron-right me-2"></i>
            All Semesters
          </Link>
        </div>
        {semesters.map(semester => (
          <div key={semester} className="semester-item mb-3">
            <Link
              to={`/instructor/modules?year=${year}&semester=${semester}`}
              className="text-decoration-none text-dark"
              onClick={() => console.log(`Navigating to modules for Year ${year}, Semester ${semester}`)}
            >
              <i className="fas fa-chevron-right me-2"></i>
              Semester {semester}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SemesterDisplayPage;