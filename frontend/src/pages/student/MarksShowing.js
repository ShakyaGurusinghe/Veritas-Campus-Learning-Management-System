import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MarksShowing.css';

const MarksShowing = () => {
  const [marks, setMarks] = useState({
    mid: 0,
    quiz: 0,
    assignment: 0,
    module: 'Computer Science '  // Default/fallback module name
  });

  const maxMarks = {
    mid: 100,
    quiz: 100,
    assignment: 100,
  };

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/student/marks/BSC0123');
        setMarks(res.data);
      } catch (err) {
        console.error('Failed to fetch marks:', err);
      }
    };

    fetchMarks();
  }, []);

  const getLevel = (score) => {
    if (score >= 75) return 'Excellent';
    if (score >= 50) return 'Very Good';
    return 'Good';
  };

  const renderMarkCard = (label, value, max) => {
    const level = getLevel(value);
    return (
      <div className="mark-card">
        <h3>{label}</h3>
        <div className="mark-score">
          <span>{value}/{max}</span>
        </div>
        <div className="mark-levels">
          <p className={level === 'Excellent' ? 'active' : ''}>
            Excellent {level === 'Excellent' && '⭐'}
          </p>
          <p className={level === 'Very Good' ? 'active' : ''}>
            Very Good {level === 'Very Good' && '⭐'}
          </p>
          <p className={level === 'Good' ? 'active' : ''}>
            Good {level === 'Good' && '⭐'}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="marks-page">
      <h1>Marks</h1>
      <h2 className="module-name">Module: {marks.module}</h2> {/* ✅ Added module name here */}
      <div className="marks-container">
        {renderMarkCard('Mid Marks', marks.mid, maxMarks.mid)}
        {renderMarkCard('Quiz Marks', marks.quiz, maxMarks.quiz)}
        {renderMarkCard('Assignment Marks', marks.assignment, maxMarks.assignment)}
      </div>
    </div>
  );
};

export default MarksShowing;
