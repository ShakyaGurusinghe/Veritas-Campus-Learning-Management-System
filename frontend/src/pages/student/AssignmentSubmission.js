
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./AssignmentSubmission.css";
import { useNavigate } from "react-router-dom";

const AssignmentSubmission = () => {
  const openDate = new Date("2025-04-05T00:00:00");
  const dueDate = new Date("2025-05-12T00:00:00");

  const [file, setFile] = useState(null);
  const [submittedAt, setSubmittedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMarkedDone, setIsMarkedDone] = useState(false);

  const fileInputRef = useRef();
  const navigate = useNavigate();
  const studentName = "John Doe"; // Replace with dynamic student value if needed

  const fetchSubmission = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/assignments/${studentName}`);
      setSubmittedAt(new Date(res.data.submittedAt));
      setFile({ name: res.data.filePath.split("/").pop() });
      setIsMarkedDone(false); // Reset on fetch
    } catch (err) {
      setSubmittedAt(null);
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmission();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("studentName", studentName);

    try {
      await axios.post("http://localhost:5000/api/assignments/submit", formData);
      fetchSubmission();
      setFile(null);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/assignments/${studentName}`);
      setFile(null);
      setSubmittedAt(null);
      setIsMarkedDone(false);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const getTimeRemainingText = () => {
    const now = submittedAt || new Date();
    const diffMs = dueDate - now;
    const absDiff = Math.abs(diffMs);
    const diffDays = Math.floor(absDiff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((absDiff / (1000 * 60 * 60)) % 24);

    if (!submittedAt) {
      return `${diffMs >= 0 ? "" : "Overdue by "}${diffDays} days and ${diffHours} hours`;
    }

    if (submittedAt < dueDate) {
      return `Submitted ${diffDays} days and ${diffHours} hours early`;
    } else {
      return `Overdue by ${diffDays} days and ${diffHours} hours`;
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="assignment-page">
      <div className="assignment-container">
        <h4 className="assignment-title">Principles of Management</h4>

        <div>
          <h5 className="assignment-subheading">Assignment 01</h5>
          <p className="assignment-dates">Opened: {openDate.toLocaleString()}</p>
          <p className="assignment-dates">Due: {dueDate.toLocaleString()}</p>

          {submittedAt && !isMarkedDone && (
            <button className="mark-as-done-btn" onClick={() => setIsMarkedDone(true)}>
              Mark as done
            </button>
          )}
          {submittedAt && isMarkedDone && (
            <button className="done-btn" disabled>
              ✅ Done
            </button>
          )}

          <table className="status-table">
            <thead>
              <tr>
                <th colSpan="2">Submission Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Submission Status</td>
                <td>{submittedAt ? "Submitted" : "No attempt"}</td>
              </tr>
              <tr>
                <td>Grading Status</td>
                <td>{submittedAt ? "Not Graded" : "-"}</td>
              </tr>
              <tr>
                <td>Time Remaining</td>
                <td>{getTimeRemainingText()}</td>
              </tr>
              <tr>
                <td>Last Modified</td>
                <td>{submittedAt ? submittedAt.toLocaleString() : "-"}</td>
              </tr>
              <tr>
                <td>Submission Comments</td>
                <td>{submittedAt ? "Submitted successfully." : "No comments"}</td>
              </tr>
            </tbody>
          </table>

          <div className="submission-actions">
            {!submittedAt ? (
              <>
                <div className="file-upload-area">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="file-input"
                    accept="*"
                  />
                  {file && (
                    <button
                      className="delete-icon-btn"
                      onClick={() => {
                        setFile(null);
                        fileInputRef.current.value = null;
                      }}
                      title="Remove file"
                    >
                      🗑️
                    </button>
                  )}
                </div>
                <button className="submit-btn" onClick={handleSubmit} disabled={!file}>
                  Submit Assignment
                </button>
                <p>You have not made a submission yet</p>
              </>
            ) : (
              <>
                <p className="uploaded-file">Uploaded: {file.name}</p>
                <button className="edit-btn" onClick={handleEdit}>
                  Edit Submission
                </button>
              </>
            )}
            <button className="back-btn" onClick={() => navigate("/")}>
              Back To Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmission;










