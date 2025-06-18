import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const ModuleDisplay = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const year = queryParams.get("year");
  const semester = queryParams.get("semester");

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const query = new URLSearchParams();
        if (year) query.set("year", year);
        if (semester) query.set("semester", semester);
        const url = `${API_BASE_URL}/api/instructor/modules?${query.toString()}`;
        console.log("Fetching modules from:", url);
        const response = await fetch(url);
        if (!response.ok) {
          const text = await response.text();
          console.log("Response status:", response.status, "Body:", text.substring(0, 100));
          throw new Error(`HTTP error! Status: ${response.status}, Body: ${text.substring(0, 50)}...`);
        }
        const contentType = response.headers.get("content-type");
        console.log("Content-Type:", contentType);
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.log("Non-JSON response:", text.substring(0, 100));
          throw new Error("Received non-JSON response from server");
        }
        const data = await response.json();
        setModules(Array.isArray(data) ? data : data.modules || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [year, semester]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this module?")) {
      return;
    }

    try {
      const url = `${API_BASE_URL}/api/instructor/modules/${id}`;
      console.log("Deleting module at:", url);
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        const errorText = contentType?.includes("application/json")
          ? (await response.json()).message
          : await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
      }
      setModules(modules.filter((module) => module._id !== id));
      alert("Module deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert(`Failed to delete module: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 mb-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4 mb-5">
        <div className="alert alert-danger" role="alert">
          Error loading modules: {error}
        </div>
        <Link to="/modules/add" className="btn btn-success">
          Add New Module
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="row mb-4">
        <div className="col-md-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/programmes">Programmes</Link>
              </li>
              <li className="breadcrumb-item">Diploma Programmes</li>
              <li className="breadcrumb-item">Management & Business Studies</li>
              <li className="breadcrumb-item">
                <Link to="/instructor/years">Year Display</Link>
              </li>
              {year && (
                <li className="breadcrumb-item">
                  <Link to={`/instructor/semesters?year=${encodeURIComponent(year)}`}>
                    Year {year}
                  </Link>
                </li>
              )}
              <li className="breadcrumb-item active" aria-current="page">
                Module Display
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <h3>
            {year
              ? `Modules for Year ${year}${semester ? `, Semester ${semester}` : ", All Semesters"}`
              : "All Modules"}
          </h3>
        </div>
        <div className="col-12 text-end">
          <Link to="/modules/add" className="btn btn-success">
            Add New Module
          </Link>
        </div>
      </div>

      {modules.length === 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info" role="alert">
              No modules found
              {year ? ` for Year ${year}${semester ? `, Semester ${semester}` : ""}` : ""}.{" "}
              <Link to="/modules/add">Add a new module</Link>.
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {modules.map((module) => (
            <div key={module._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{module.title || "No title"}</h5>
                  <p className="card-text">Week: {module.week || "N/A"}</p>
                  <p className="card-text">
                    Year: {module.year || "N/A"}, Semester: {module.semester || "N/A"}
                  </p>
                  <p className="card-text">{module.description || "No description"}</p>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/instructor/modules/${module._id}`}
                      className="btn btn-primary"
                      aria-label={`View details for ${module.title || "module"}`}
                    >
                      Enroll Module
                    </Link>
                    <Link
                      to={`/modules/edit/${module._id}`}
                      className="btn btn-warning"
                      aria-label={`Edit ${module.title || "module"}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(module._id)}
                      className="btn btn-danger"
                      aria-label={`Delete ${module.title || "module"}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleDisplay;