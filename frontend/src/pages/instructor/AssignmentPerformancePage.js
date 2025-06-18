import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import '../../css/AssignmentPerformancePage.css'; // We can create this later

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const AssignmentPerformancePage = () => {
  const { assignmentId } = useParams();
  const [performanceData, setPerformanceData] = useState(null);
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: Replace with actual API calls
        // Fetch assignment details
        // const assignmentResponse = await fetch(`/api/instructor/assignments/${assignmentId}`);
        // if (!assignmentResponse.ok) {
        //   throw new Error(`HTTP error! status: ${assignmentResponse.status}`);
        // }
        // const assignmentData = await assignmentResponse.json();
        // setAssignmentDetails(assignmentData);

        // Placeholder assignment data
        setAssignmentDetails({
          title: 'Introduction to Programming Assignment',
          module: 'CS101 - Introduction to Programming',
          dueDate: '2024-03-15'
        });

        // Fetch performance data
        // const performanceResponse = await fetch(`/api/instructor/assignments/${assignmentId}/performance`);
        // if (!performanceResponse.ok) {
        //   throw new Error(`HTTP error! status: ${performanceResponse.status}`);
        // }
        // const performanceData = await performanceResponse.json();
        // setPerformanceData(performanceData);

        // Placeholder performance data
        setPerformanceData({
          onTime: '85%',
          afterDeadline: '15%',
          onTimeCount: 85,
          afterDeadlineCount: 15
        });

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [assignmentId]);

  if (loading) {
    return <div className="container mt-4 mb-5">Loading performance data...</div>;
  }

  if (error) {
    return <div className="container mt-4 mb-5">Error: {error.message}</div>;
  }

  if (!performanceData || !assignmentDetails) {
    return <div className="container mt-4 mb-5">No data available for this assignment.</div>;
  }

  // Prepare data for the pie chart
  const chartData = {
    labels: ['On Time', 'After Deadline'],
    datasets: [
      {
        data: [performanceData.onTimeCount, performanceData.afterDeadlineCount],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',  // Teal for on time
          'rgba(255, 99, 132, 0.6)',  // Red for after deadline
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Assignment Submission Timeline',
        font: {
          size: 16
        }
      }
    }
  };

  return (
    <div className="container mt-4 mb-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/instructor/assignments">Assignments</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Assignment Performance</li>
        </ol>
      </nav>

      <h1 className="mb-3">Assignment Performance for {assignmentDetails.title}</h1>

      <p>Submitted Assignments on time = {performanceData.onTime}</p>
      <p>Submitted Assignments after deadline = {performanceData.afterDeadline}</p>

      <h5 className="mt-4">Summary with pie chart</h5>
      <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
        <Pie data={chartData} options={chartOptions} />
      </div>

      {/* TODO: Add table or list of individual student submissions */}
    </div>
  );
};

export default AssignmentPerformancePage; 