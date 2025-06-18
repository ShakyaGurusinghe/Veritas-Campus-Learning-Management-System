import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/DiplomaYearDisplay.css';

const DiplomaYearDisplay = () => {
    const [diplomaYears, setDiplomaYears] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch diploma years data
        const fetchDiplomaYears = async () => {
            try {
                const response = await axios.get('/api/diploma-years');
                setDiplomaYears(response.data);
            } catch (error) {
                console.error('Error fetching diploma years:', error);
            }
        };

        fetchDiplomaYears();
    }, []);

    const handleYearClick = (yearId) => {
        navigate(`/instructor/years/${yearId}`);
    };

    return (
        <div className="diploma-year-container">
            <h2 className="diploma-year-title">Diploma Years</h2>
            <div className="diploma-year-grid">
                {diplomaYears.map((year) => (
                    <div key={year._id} className="diploma-year-card">
                        <div className="card-body">
                            <div className="year-number">Year {year.yearNumber}</div>
                            <p className="diploma-year-date">
                                Start Date: {new Date(year.startDate).toLocaleDateString()}
                            </p>
                            <p className="diploma-year-date">
                                End Date: {new Date(year.endDate).toLocaleDateString()}
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleYearClick(year._id)}
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

export default DiplomaYearDisplay; 