const express = require('express');
const router = express.Router();
const { getStudentMarks, addStudentMarks } = require('../../controllers/student/marksController');

router.get('/marks/:studentId', getStudentMarks);

// OPTIONAL: route to add marks
router.post('/marks', addStudentMarks);

module.exports = router;

