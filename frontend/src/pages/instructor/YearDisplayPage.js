import React from 'react';
import { Link } from 'react-router-dom';

const YearDisplayPage = () => {
  // Placeholder data - replace with fetched data
  const years = [1, 2]; // Based on Figma, showing 1st and 2nd Year

  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/programmes">Programmes</Link></li>
          {/* Add more breadcrumb items as needed based on your site structure */}
          <li className="breadcrumb-item active" aria-current="page">Year Display</li>
        </ol>
      </nav>

      {/* Image */}
      {/* Removed image line as requested */}

      {/* Year List */}
      <div className="year-list-container">
        {years.map(year => (
          <div key={year} className="year-item mb-3">
            <Link to={`/instructor/semesters?year=${year}`} className="text-decoration-none text-dark">
              <i className="fas fa-chevron-right me-2"></i> {/* Example icon, assuming Font Awesome is used */}
              {year} Year
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

export default YearDisplayPage; 