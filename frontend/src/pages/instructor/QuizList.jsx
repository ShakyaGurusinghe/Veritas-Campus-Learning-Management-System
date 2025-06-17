import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ id: null, title: '' });
  const [flashMessage, setFlashMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

// Show flash message when navigated back from update
useEffect(() => {
  if (location.state && location.state.updated) {
    setFlashMessage('Updated Successfully');
    // clear the updated flag so it won't re-trigger
    navigate(location.pathname, { replace: true });
  }
}, [location, navigate]);

// Auto-clear any flash message after 3 seconds
useEffect(() => {
  if (flashMessage) {
    const timer = setTimeout(() => {
      setFlashMessage('');
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [flashMessage]);
  
  // Fetch quizzes from the backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quizzes");
        setQuizzes(response.data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
    };
    
    fetchQuizzes();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Open confirmation modal
  const confirmDelete = (id, title) => {
    setDeleteTarget({ id, title });
    setShowDeleteModal(true);
  };

  // Perform deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/quizzes/${deleteTarget.id}`);
      setQuizzes(prev => prev.filter(q => q._id !== deleteTarget.id));
      setShowDeleteModal(false);
      setFlashMessage("Deleted Successfully");
    } catch (err) {
      console.error("Error deleting quiz:", err);
      alert("Failed to delete quiz.");
      setShowDeleteModal(false);
    }
  };

  // Close the modal without deleting
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteTarget({ id: null, title: '' });
  };

  // Filter quizzes by title
  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-5">
      {/* Page Heading */}
      <div className="mb-4">
        <h2 className="fw-bold" style={{ color: '#7AC144' }}>Added Quizes</h2>
        <div className="d-flex align-items-center">
          <input
            type="text"
            placeholder="Filter by title"
            value={search}
            onChange={handleSearch}
            className="form-control me-3"
            style={{ width: "250px" }}
          />
          <Link to="/addquiz" className="ms-auto">
            <button className="btn btn-success fw-bold" style={{ backgroundColor: '#7AC144', border: 'none' }}>Add Quiz</button>
          </Link>
        </div>
      </div>

      {/* Table to Display Quizzes */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Quiz ID</th>
            <th>Quiz Type</th>
            <th>Description</th>
            <th>Quiz Status</th>
            <th>Quiz Attendance</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
        {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz, index) => {
              // Determine display status
              const now = new Date();
              const deadline = quiz.timeLimit ? new Date(quiz.timeLimit) : null;
              let displayStatus = 'Scheduled';
              if (quiz.status === 'Cancelled') {
                displayStatus = 'Cancelled';
              } else if (deadline && deadline < now) {
                displayStatus = 'Completed';
              }

              return (
                <tr key={quiz._id}>
                  <td>{index + 1}</td>
                  <td>{quiz.title}</td>
                  <td>{quiz.description || 'No description available'}</td>
                  <td>{displayStatus}</td>
                  <td>{quiz.attendance || 'Not available'}</td>
                  <td>
                    
                  <Link to={`/performance/${quiz._id}`}>
                  <button className="btn btn-info me-2"
                          style={{
                            backgroundColor: '#fff',       // white background
                            color: '#198754',              // Bootstrap primary blue text/icon
                            border: '1px solid #198754'    // blue border
                          }}>
                    <i className="bi bi-eye"></i>
                  </button>
                  </Link>

                  <Link to={`/updatequiz/${quiz._id}`}>
                    <button
                      className="btn btn-sm me-2"
                      style={{
                        backgroundColor: '#fff',
                        color: '#0d6efd',
                        border: '1px solid #0d6efd'
                      }}
                      title="Update"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </Link>
                                          
                  <button className="btn btn-danger"
                          style={{
                            backgroundColor: '#fff',       // white background
                            color: '#dc3545',              // Bootstrap primary blue text/icon
                            border: '1px solid #dc3545'    // blue border
                          }}
                          onClick={() => confirmDelete(quiz._id, quiz.title)}>
                            <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
           );
          })
        ) : (
            <tr>
              <td colSpan="6" className="text-center">No quizzes available</td>
            </tr>
          )}
        </tbody>
      </table>

      {flashMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '20px',
            backgroundColor: '#198754',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }
          }
        >
          <i className="bi bi-check-circle-fill me-2"></i>
          {flashMessage}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Are you sure you want to delete “{deleteTarget.title}”?</h3>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button className="btn btn-light" onClick={cancelDelete}>No</button>
              <button className="btn btn-success" onClick={handleDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}


      
    </div>
  );
};

export default QuizList;
