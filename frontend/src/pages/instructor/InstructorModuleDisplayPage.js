import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../css/InstructorModuleDisplayPage.css'; // Import the CSS file

const InstructorModuleDisplayPage = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newLectureMaterial, setNewLectureMaterial] = useState({ title: '', description: '', url: '' });
  const [openWeeks, setOpenWeeks] = useState({}); // State to manage collapsed/expanded weeks
  const [openContentTypes, setOpenContentTypes] = useState({}); // State to manage collapsed/expanded content types

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const response = await fetch(`/api/instructor/modules/${moduleId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setModule(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleDetails();
  }, [moduleId]);

  const handleAddContent = async (contentType, content) => {
    try {
      const response = await fetch(`/api/instructor/modules/${moduleId}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contentType, content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedModule = await response.json();
      setModule(updatedModule);
      // Clear the specific form after adding
      if (contentType === 'lectureMaterials') setNewLectureMaterial({ title: '', description: '', url: '' });
      // Add clearing for other content types later

    } catch (error) {
      console.error(`Error adding ${contentType}:`, error);
      // Optionally set an error state for the user
    }
  };

  const handleAddLectureMaterialSubmit = (e) => {
    e.preventDefault();
    handleAddContent('lectureMaterials', newLectureMaterial);
  };

  // Placeholder for handling assignment deletion
  const handleDeleteAssignment = async (assignmentId) => {
    console.log('Deleting assignment:', assignmentId);
    // Implement API call to delete assignment from the module
    // After successful deletion, refetch module details or update state
  };

  // Placeholder for handling assignment editing - will likely navigate to a new page or open a modal
  const handleEditAssignment = (assignmentId) => {
    console.log('Editing assignment:', assignmentId);
    // Navigate to edit assignment page: navigate(`/instructor/assignments/edit/${assignmentId}`);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!module) {
    return <div>Module not found</div>;
  }

  // Group content by week - assuming module has a 'week' property
  // This might need adjustment based on actual data structure
  const contentByWeek = { [module.week]: {
      lectureMaterials: module.lectureMaterials || [],
      quizzes: module.quizzes || [],
      assignments: module.assignments || [],
      announcements: module.announcements || [],
  }};

  return (
    <div className="container mt-4 mb-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/programmes">Programmes</Link></li>
            {/* Assuming these paths exist based on your app structure */}
            <li className="breadcrumb-item"><Link to="#">Diploma Programmes</Link></li>
            <li className="breadcrumb-item"><Link to="#">Management & Business Studies</Link></li>
            <li className="breadcrumb-item"><Link to="/instructor/years">Year Display</Link></li>
            <li className="breadcrumb-item"><Link to="/instructor/semesters">Semester Display</Link></li>
            {/* You might want to dynamically set the module title in the breadcrumb */}
            <li className="breadcrumb-item active" aria-current="page">{module.title}</li>
          </ol>
        </nav>

        <h1>{module.title}</h1>
        <p>{module.description}</p>

        {/* Content sections */}
        {Object.entries(contentByWeek).map(([week, content]) => (
          <div key={week} className="week-section">
            <h3 onClick={() => toggleWeek(week)} style={{ cursor: 'pointer' }}>
              Week {week} {openWeeks[week] ? '▼' : '►'}
            </h3>
            {openWeeks[week] && (
              <div className="content-types-container">

                {/* Lecture Materials */}
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
                              {/* Add Edit and Delete buttons later */}
                            </li>
                          ))}
                        </ul>
                      ) : (
                         <p>No lecture materials added yet.</p>
                      )}
                    </>
                  )}
                </div>

                {/* Quizzes */}
                <div className="module-section">
                  <h4 onClick={() => toggleContentType(week, 'quizzes')} style={{ cursor: 'pointer' }}>
                    Quizzes {openContentTypes[`${week}-quizzes`] ? '▼' : '►'}
                  </h4>
                  {openContentTypes[`${week}-quizzes`] && (
                     <p>Display existing quizzes and form to add new</p> // Placeholder
                  )}
                </div>

                {/* Assignments */}
                <div className="module-section">
                  <h4 onClick={() => toggleContentType(week, 'assignments')} style={{ cursor: 'pointer' }}>
                    Assignments {openContentTypes[`${week}-assignments`] ? '▼' : '►'}
                  </h4>
                  {openContentTypes[`${week}-assignments`] && (
                    <div>
                       {/* Add New Assignment Button - will link to AddAssignmentPage */}
                       <Link to={`/instructor/modules/${moduleId}/assignments/add`} className="btn btn-success btn-sm mb-3">Add New Assignment</Link>

                       {/* Display existing Assignments */}
                       <h5>Existing Assignments</h5>
                       {content.assignments.length > 0 ? (
                          <ul>
                            {content.assignments.map((assignment) => (
                              <li key={assignment._id} className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-3 p-3 border rounded">
                                 <div className="mb-2 mb-md-0">
                                    <h6>{assignment.title}</h6>
                                    {assignment.dueDate && <p className="text-muted mb-0" style={{fontSize: '0.9em'}}>Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>}
                                 </div>
                                 <div className="d-flex flex-wrap justify-content-md-end">
                                    {/* View Performance Button */}
                                    <Link to={`/instructor/assignments/${assignment._id}/performance`} className="btn btn-info btn-sm me-2 mb-2 mb-md-0">View Performance</Link>
                                    {/* Edit Button */}
                                    <button
                                      className="btn btn-secondary btn-sm me-2 mb-2 mb-md-0"
                                      onClick={() => handleEditAssignment(assignment._id)}
                                    >
                                      Edit
                                    </button>
                                    {/* Delete Button */}
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

                {/* Announcements */}
                <div className="module-section">
                   <h4 onClick={() => toggleContentType(week, 'announcements')} style={{ cursor: 'pointer' }}>
                    Announcements {openContentTypes[`${week}-announcements`] ? '▼' : '►'}
                  </h4>
                  {openContentTypes[`${week}-announcements`] && (
                     <p>Display existing announcements and form to add new</p> // Placeholder
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