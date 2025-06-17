import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useParams, Link } from 'react-router-dom';

// Define colors for each metric
const COLORS = ['#7AC144', '#00C49F', '#FFBB28', '#FF4C4C'];

const QuizPerformance = () => {
  const { id } = useParams();
  const [performance, setPerformance] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    // Fetch performance data from backend
    axios
      .get(`http://localhost:5000/api/quizzes/${id}/performance`)
      .then(res => setPerformance(res.data))
      .catch(err => console.error('Error fetching performance:', err));
  }, [id]);

  if (!performance) {
    return <div className="text-center py-5">Loading...</div>;
  }

  // Prepare metrics for pie charts
  const metrics = [
    { name: 'Accuracy', value: performance.accuracy },
    { name: 'Completed', value: performance.completedCount },
    { name: 'Submissions', value: performance.submissions },
    { name: 'Passed', value: performance.passCount }
  ];

  // Download section as PDF
  const handleDownload = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`quiz-${id}-performance.pdf`);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="px-4 py-3 bg-light">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item">Programmes</li>
            <li className="breadcrumb-item active" aria-current="page">Quiz Performance</li>
          </ol>
        </nav>
      </div>

      {/* Printable Area */}
      <div ref={printRef} className="container my-5">
        {/* Header */}
        <h2 className="fw-bold text-success">Quiz Performance</h2>
        <p className="fs-6">BM 3010 - Module 01</p>

        {/* Info Row */}
        <div className="row mb-4">
          <div className="col-md-4"><strong>Quiz Type:</strong> {performance.quizType}</div>
          <div className="col-md-4"><strong>Question Count:</strong> {performance.questionCount}</div>
          <div className="col-md-4 d-flex justify-content-md-end">
            <strong>Started Date:</strong>&nbsp;
            <span className="badge bg-light text-dark">
              {new Date(performance.startDate).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>
        </div>

        {/* Pie Charts */}
        <div className="row text-center mb-5">
          {metrics.map((m, idx) => (
            <div key={m.name} className="col-6 col-md-3 mb-4">
              <h6>{m.name}</h6>
              <ResponsiveContainer width="100%" height={120}>
                <PieChart>
                  <Pie
                    data={[
                      { name: m.name, value: m.value },
                      { name: 'Remaining', value: performance.totalQuestions - m.value }
                    ]}
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                  >
                    <Cell key="filled" fill={COLORS[idx]} />
                    <Cell key="empty" fill="#eee" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>

        {/* Overview Table */}
        <h5 className="mb-3">Overview</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Points</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {performance.overview.map(row => (
              <tr key={row.studentId}>
                <td>{row.studentId}</td>
                <td>{row.studentName}</td>
                <td>{row.points}</td>
                <td>{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Button */}
      <div className="container mb-5 text-end">
        <button className="btn btn-success" onClick={handleDownload}>
          Download as PDF
        </button>
      </div>
    </>
  );
};

export default QuizPerformance;
