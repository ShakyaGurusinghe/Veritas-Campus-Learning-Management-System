import React from 'react';
import { Link } from 'react-router-dom';

const YearDisplayPage = () => {
  const years = [1, 2, 3, 4]; // Explicitly list years 1-4

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/programmes">Programmes</Link></li>
          <li className="breadcrumb-item">Diploma Programmes</li>
          <li className="breadcrumb-item">Management & Business Studies</li>
          <li className="breadcrumb-item active" aria-current="page">Year Display</li>
        </ol>
      </nav>

      <h3>Select a Year</h3>

      <div className="year-list-container">
        {years.map(year => (
          <div key={year} className="year-item mb-3">
            <Link
              to={`/instructor/semesters?year=${year}`}
              className="text-decoration-none text-dark"
              onClick={() => console.log(`Navigating to semesters for Year ${year}`)}
            >
              <i className="fas fa-chevron-right me-2"></i>
              Year {year}
            </Link>
          </div>
        ))}
      </div>

      {/* Comment out timetable link until implemented */}
      {/* <div className="text-end mt-4">
        <Link to="/timetable" className="btn btn-success">
          View Time Table <i className="far fa-calendar-alt ms-2"></i>
        </Link>
      </div> */}
    </div>
  );
};

export default YearDisplayPage;