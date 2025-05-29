import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SemesterDisplayPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const year = queryParams.get('year');

  // Placeholder data - replace with fetched data based on year
  const semesters = [1, 2]; // Assuming each year has 2 semesters, based on Figma

  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/programmes">Programmes</Link></li>
          {/* Add more breadcrumb items as needed */}
          <li className="breadcrumb-item active" aria-current="page">Semester Display</li>
        </ol>
      </nav>

      {/* Image */}
      {/* Removed image line as requested */}

      {/* Semester List */}
      <div className="semester-list-container">
        {semesters.map(semester => (
          <div key={semester} className="semester-item mb-3">
            <Link to={`/instructor/modules?year=${year}&semester=${semester}`} className="text-decoration-none text-dark">
              <i className="fas fa-chevron-right me-2"></i> {/* Example icon */}
              {semester} Semester
            </Link>
          </div>
        ))}
      </div>

      {/* View Time Table Button */}
      <div className="text-end mt-4">
        <button className="btn btn-success">
           View Time Table <i className="far fa-calendar-alt ms-2"></i> {/* Example icon */}
        </button>
      </div>
    </div>
  );
};

export default SemesterDisplayPage; 