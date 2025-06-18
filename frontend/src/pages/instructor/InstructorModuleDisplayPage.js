import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../css/InstructorModuleDisplayPage.css'; // Import the CSS file

const InstructorModuleDisplayPage = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newLectureMaterial, setNewLectureMaterial] = useState({ title: '', description: '', url: '' });
  const [openWeeks, setOpenWeeks] = useState({});
  const [openContentTypes, setOpenContentTypes] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const url = `${API_BASE_URL}/api/instructor/modules/${moduleId}`;
        console.log("Fetching module from:", url);
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
        console.log('[DEBUG-FRONTEND] Module data received:', data);
        console.log('[DEBUG-FRONTEND] Assignments count:', data.assignments?.length || 0);
        setModule(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleDetails();
  }, [moduleId]);

  const handleAddContent = async (contentType, content) => {
    try {
      const url = `${API_BASE_URL}/api/instructor/modules/${moduleId}/content`;
      console.log(`Adding ${contentType} to:`, url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentType, content }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.log("Response status:", response.status, "Body:", text.substring(0, 100));
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${text.substring(0, 50)}...`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.log("Non-JSON response:", text.substring(0, 100));
        throw new Error("Received non-JSON response from server");
      }

      const updatedModule = await response.json();
      setModule(updatedModule);
      if (contentType === 'lectureMaterials') setNewLectureMaterial({ title: '', description: '', url: '' });
    } catch (error) {
      console.error(`Error adding ${contentType}:`, error);
      setError(error.message);
    }
  };

  const handleAddLectureMaterialSubmit = (e) => {
    e.preventDefault();
    handleAddContent('lectureMaterials', newLectureMaterial);
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      const url = `${API_BASE_URL}/api/instructor/assignments/${assignmentId}`;
      console.log("Deleting assignment at:", url);
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        const text = await response.text();
        console.log("Response status:", response.status, "Body:", text.substring(0, 100));
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${text.substring(0, 50)}...`);
      }
      
      // Refresh the module data to show updated assignments
      const moduleResponse = await fetch(`${API_BASE_URL}/api/instructor/modules/${moduleId}`);
      if (moduleResponse.ok) {
        const updatedModule = await moduleResponse.json();
        setModule(updatedModule);
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
      setError(error.message);
    }
  };

  const toggleWeek = (week) => {
    setOpenWeeks(prevState => ({
      ...prevState,
      [week]: !prevState[week]
    }));
  };

  const toggleContentType = (week, type) => {
    const key = `${week}-${type}`;
    setOpenContentTypes(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
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
          Error: {error}
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="container mt-4 mb-5">
        <div className="alert alert-info" role="alert">
          Module not found
        </div>
      </div>
    );
  }

  const contentByWeek = {
    [module.week]: {
      lectureMaterials: module.lectureMaterials || [],
      quizzes: module.quizzes || [],
      assignments: module.assignments || [],
      announcements: module.announcements || [],
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/programmes">Programmes</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">Diploma Programmes</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">Management & Business Studies</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/instructor/years">Year Display</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/instructor/semesters">Semester Display</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{module.title}</li>
        </ol>
      </nav>

      <h1>{module.title}</h1>
      <p>{module.description}</p>

      {Object.entries(contentByWeek).map(([week, content]) => (
        <div key={week} className="week-section">
          <h3 onClick={() => toggleWeek(week)} style={{ cursor: 'pointer' }}>
            Week {week} {openWeeks[week] ? '▼' : '►'}
          </h3>
          {openWeeks[week] && (
            <div className="content-types-container">
              <div className="module-section">
                <h4 onClick={() => toggleContentType(week, 'lectureMaterials')} style={{ cursor: 'pointer' }}>
                  Lecture Materials {openContentTypes[`${week}-lectureMaterials`] ? '▼' : '►'}
                </h4>
                {openContentTypes[`${week}-lectureMaterials`] && (
                  <>
                    <h5>Add New Lecture Material</h5>
                    <form onSubmit={handleAddLectureMaterialSubmit} className="mb-4">
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Title"
                          value={newLectureMaterial.title}
                          onChange={(e) => setNewLectureMaterial({ ...newLectureMaterial, title: e.target.value })}
                          required
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <textarea
                          placeholder="Description"
                          value={newLectureMaterial.description}
                          onChange={(e) => setNewLectureMaterial({ ...newLectureMaterial, description: e.target.value })}
                          className="form-control"
                          rows="2"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="URL"
                          value={newLectureMaterial.url}
                          onChange={(e) => setNewLectureMaterial({ ...newLectureMaterial, url: e.target.value })}
                          className="form-control"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary btn-sm">Add Lecture Material</button>
                    </form>

                    <h5>Existing Lecture Materials</h5>
                    {content.lectureMaterials.length > 0 ? (
                      <ul>
                        {content.lectureMaterials.map((item) => (
                          <li key={item._id}>
                            <h6>{item.title}</h6>
                            <p>{item.description}</p>
                            {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer">Link</a>}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No lecture materials added yet.</p>
                    )}
                  </>
                )}
              </div>

              <div className="module-section">
                <h4 onClick={() => toggleContentType(week, 'quizzes')} style={{ cursor: 'pointer' }}>
                  Quizzes {openContentTypes[`${week}-quizzes`] ? '▼' : '►'}
                </h4>
                {openContentTypes[`${week}-quizzes`] && (
                  <p>Display existing quizzes and form to add new</p>
                )}
              </div>

              <div className="module-section">
                <h4 onClick={() => toggleContentType(week, 'assignments')} style={{ cursor: 'pointer' }}>
                  Assignments {openContentTypes[`${week}-assignments`] ? '▼' : '►'}
                </h4>
                {openContentTypes[`${week}-assignments`] && (
                  <div>
                    {console.log('[DEBUG-FRONTEND] Content object:', content)}
                    <Link to={`/instructor/modules/${moduleId}/assignments/add`} className="btn btn-success btn-sm mb-3">Add New Assignment</Link>
                    <h5>Existing Assignments</h5>
                    {content.assignments.length > 0 ? (
                      <ul>
                        {content.assignments.map((assignment) => (
                          <li key={assignment._id} className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-3 p-3 border rounded">
                            <div className="mb-2 mb-md-0">
                              <h6>{assignment.title}</h6>
                              {assignment.deadline && <p className="text-muted mb-0" style={{fontSize: '0.9em'}}>Due: {new Date(assignment.deadline).toLocaleDateString()}</p>}
                              {assignment.description && <p className="text-muted mb-0" style={{fontSize: '0.9em'}}>{assignment.description}</p>}
                            </div>
                            <div className="d-flex flex-wrap justify-content-md-end">
                              <Link to={`/instructor/assignments/${assignment._id}/performance`} className="btn btn-info btn-sm me-2 mb-2 mb-md-0">View Performance</Link>
                              <Link to={`/instructor/modules/${moduleId}/assignments/${assignment._id}/edit`} className="btn btn-secondary btn-sm me-2 mb-2 mb-md-0">
                                Edit
                              </Link>
                              <button
                                className="btn btn-danger btn-sm mb-2 mb-md-0"
                                onClick={() => handleDeleteAssignment(assignment._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No assignments added yet.</p>
                    )}
                  </div>
                )}
              </div>

              <div className="module-section">
                <h4 onClick={() => toggleContentType(week, 'announcements')} style={{ cursor: 'pointer' }}>
                  Announcements {openContentTypes[`${week}-announcements`] ? '▼' : '►'}
                </h4>
                {openContentTypes[`${week}-announcements`] && (
                  <p>Display existing announcements and form to add new</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InstructorModuleDisplayPage;