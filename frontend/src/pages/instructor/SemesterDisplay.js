import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/SemesterDisplay.css';

const SemesterDisplay = () => {
    const [semesters, setSemesters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch semesters data
        const fetchSemesters = async () => {
            try {
                const response = await axios.get('/api/semesters');
                setSemesters(response.data);
            } catch (error) {
                console.error('Error fetching semesters:', error);
            }
        };

        fetchSemesters();
    }, []);

    const handleSemesterClick = (semesterId) => {
        navigate(`/instructor/semesters/${semesterId}`);
    };

    return (
        <div className="semester-container">
            <h2 className="semester-title">Semesters</h2>
            <div className="semester-grid">
                {semesters.map((semester) => (
                    <div key={semester._id} className="semester-card">
                        <div className="card-body">
                            <h5 className="card-title">{semester.name}</h5>
                            <p className="semester-date">
                                Start Date: {new Date(semester.startDate).toLocaleDateString()}
                            </p>
                            <p className="semester-date">
                                End Date: {new Date(semester.endDate).toLocaleDateString()}
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleSemesterClick(semester._id)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SemesterDisplay; 