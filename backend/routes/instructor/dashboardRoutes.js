const express = require('express');
const router = express.Router();
const {getDashboardData} = require('../../controllers/instructor/dashboardController');

//'/instructor/dashboard'

router.get('/dashboard', (req, res) => {
    res.json({
        schedule: {
        subjectCode: "SE4010",
        subject: "Software Engineering",
        time: "10:00 AM - 12:00 PM",
        location: "Room A203",
        status: "Ongoing"
        },
        enrolments: [
        { subject: "Software Engineering", count: 45 },
        { subject: "IUP", count: 40 }
        ],
        submissions: [
        {
            studentId: "IT20120001",
            subjectId: "SE4010",
            assignment: "Assignment 1",
            submissionDate: "2025-05-30 23:59",
            submittedDate: "2025-05-28 11:30",
            fileUrl: "/uploads/assignments/assignment1-it20120001.pdf"
        }
        ]
    });
});

module.exports = router;