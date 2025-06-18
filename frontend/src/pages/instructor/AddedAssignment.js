import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/AddedAssignment.css';
import { FaEdit, FaTrash, FaDownload, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../components/SuccessModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import SuccessToast from '../../components/SuccessToast';
import Button from '../../components/Button';

const AddedAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const formatDate = (dateString) => {
    // Create date object from the UTC string
    const date = new Date(dateString);
    
    // Get the timezone offset in minutes
    const timezoneOffset = date.getTimezoneOffset();
    
    // Adjust the date by adding the timezone offset to get the original time
    const adjustedDate = new Date(date.getTime() + (timezoneOffset * 60000));
    
    const year = adjustedDate.getFullYear();
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const day = String(adjustedDate.getDate()).padStart(2, '0');
    const hours = String(adjustedDate.getHours()).padStart(2, '0');
    const minutes = String(adjustedDate.getMinutes()).padStart(2, '0');
    const ampm = adjustedDate.getHours() >= 12 ? 'PM' : 'AM';
    const formattedHours = adjustedDate.getHours() % 12 || 12;
    
    return `${year}-${month}-${day} ${formattedHours}:${minutes} ${ampm}`;
  };

  const fetchAssignments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/instructor/assignments');
      const assignmentsWithFormattedTime = res.data.map(assignment => ({
        ...assignment,
        deadline: formatDate(assignment.deadline)
      }));
      setAssignments(assignmentsWithFormattedTime);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };

  const confirmDelete = (id) => {
    setSelectedAssignmentId(id);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/instructor/assignments/${selectedAssignmentId}`);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
      fetchAssignments();
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (err) {
      console.error('Error deleting assignment:', err);
    }
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="assignment-list">
      <h2>Added Assignments for BM3010 - Introduction to Management</h2>

      <div className="assignment-header">
        <input
          type="text"
          placeholder="Filter by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button text="Add Assignment" onClick={() => navigate('/addassignment')} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Assignment Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Visibility</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment, index) => (
              <tr key={assignment._id}>
                <td>{index + 1}</td>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{assignment.deadline}</td>
                <td>{assignment.visibility}</td>
                <td>
                  <a
                    href={`http://localhost:5000/uploads/${assignment.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFilePdf color="red" />
                  </a>
                </td>
                <td className="actions">
                  <a href={`http://localhost:5000/uploads/${assignment.fileUrl}`} download>
                    <FaDownload color="green" />
                  </a>
                  <button onClick={() => navigate(`/instructor/edit-assignment/${assignment._id}`)}>
                    <FaEdit color="cornflowerblue" />
                  </button>
                  <button onClick={() => confirmDelete(assignment._id)}>
                    <FaTrash color="red" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No assignments found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="see-performance-container">
        <Button text="See Performance" onClick={() => navigate('/instructor/performance')} />
      </div>

      {showConfirmModal && (
        <ConfirmDeleteModal
          message="Are you sure you want to delete this assignment?"
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {showSuccessModal && (
        <SuccessToast
          message="Deleted Successfully"
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default AddedAssignment;