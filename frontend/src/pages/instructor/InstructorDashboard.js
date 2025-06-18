import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstructorDashboard = () => {
    const [data, setData] = useState(null);
    const [time, setTime] = useState(new Date().toLocaleString());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date().toLocaleString()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/api/instructor/dashboard')
          .then(res => setData(res.data))
          .catch(err => console.error('Dashboard fetch error:', err));
    }, []);

    if(!data) return <p>Loading...</p>

    return (
        <div className="container mt-4">
      <h2 className="text-success fw-bold">Dashboard <span className="float-end">{time}</span></h2>

      {/* My Schedule */}
      <div className="card mb-4">
        <div className="card-header bg-light">My Schedule <span className="float-end text-success">Date: {new Date(data.schedule.date).toLocaleDateString()}</span></div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead><tr><th>Subject Code</th><th>Subject</th><th>Time</th><th>Location</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td>{data.schedule.subjectCode}</td>
                <td>{data.schedule.subject}</td>
                <td>{data.schedule.time}</td>
                <td>{data.schedule.location}</td>
                <td>{data.schedule.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Enrolments and Quick Links */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-light">Assigned Subjects & Student Enrolment</div>
            <ul className="list-group list-group-flush">
              {data.enrolments.map((e, i) => (
                <li key={i} className="list-group-item d-flex justify-content-between">
                  <strong>{e.subject}</strong>
                  <span>{e.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">                                                                   
            <div className="card-header bg-light">Quick Links</div>
            <div className="card-body d-grid gap-2">
              <a href="/modules" className="btn btn-success">Modules</a>
              <a href="/addquiz" className="btn btn-success">Create a Quiz</a>
              <a href="/addassignment" className="btn btn-success">Add New Assignments</a>
              <a href="/instructor/support-list" className="btn btn-success">My Ticket Forums</a>
              <a href="/instructor/add-lecture-material/:courseId" className="btn btn-success">Add New Lecture Materials</a>
              <a href="/addannouncement" className="btn btn-success">Add Announcement</a>
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Submissions */}
      <div className="card mt-4">
        <div className="card-header bg-light">Student Assignment Submissions</div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Student ID</th><th>Subject ID</th><th>Assignment</th>
                <th>Submission Date & Time</th><th>Submitted Date & Time</th><th>Uploaded Files</th>
              </tr>
            </thead>
            <tbody>
              {data.submissions.map((sub, i) => (
                <tr key={i}>
                  <td>{sub.studentId}</td>
                  <td>{sub.subjectId}</td>
                  <td>{sub.assignment}</td>
                  <td>{sub.submissionDate}</td>
                  <td>{sub.submittedDate}</td>
                  <td><a href={sub.fileUrl} target="_blank" rel="noreferrer" className="btn btn-outline-success btn-sm">🔽</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
};

export default InstructorDashboard;