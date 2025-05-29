import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ModuleDisplay = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('/api/instructor/modules'); // Assuming this is the correct API endpoint to get all modules
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setModules(data);
      } catch (error) {
        console.error('Error fetching modules:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div className="container mt-4 mb-5">Loading modules...</div>;
  }

  if (error) {
    return <div className="container mt-4 mb-5">Error loading modules: {error.message}</div>;
  }

  return (
    <div className="container mt-4 mb-5">


        <div className="row mb-4">
          <div className="col-md-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/programmes">Programmes</Link></li>
                {/* Assuming these paths exist based on your app structure */}
                <li className="breadcrumb-item"><Link to="#">Diploma Programmes</Link></li>
                <li className="breadcrumb-item"><Link to="#">Management & Business Studies</Link></li>
                <li className="breadcrumb-item"><Link to="/instructor/years">Year Display</Link></li>
                {/* You might want to dynamically set the year and semester in the breadcrumb based on how you navigate here */}
                <li className="breadcrumb-item"><Link to="/instructor/semesters">Semester Display</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Module Display</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row mb-3">
           <div className="col-12 text-end">
             <Link to="/modules/add" className="btn btn-success">Add New Module</Link>
           </div>
        </div>

        <div className="row">
          {/* Module cards go here */}
          {modules.map(module => (
            <div key={module._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{module.title}</h5>{/* Use module data */}
                  <p className="card-text">Week: {module.week}</p> {/* Display week */}
                  <p className="card-text">{module.description}</p>{/* Use module data */}
                  {/* Update link to navigate to the specific module display page using module._id */}
                  <Link to={`/instructor/modules/${module._id}`} className="btn btn-primary">Click to enroll</Link> {/* Updated link */}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-12 text-end mb-3">
            {/* Update link as needed */}
            <Link to="/timetable" className="btn btn-success me-2">View Time Table</Link>
          </div>
        </div>

      </div>
    
  );
};

export default ModuleDisplay;
