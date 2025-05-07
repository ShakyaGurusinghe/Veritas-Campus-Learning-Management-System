

const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload');
const {
  submitAssignment,
  getAssignment,
  deleteAssignment,
} = require('../../controllers/student/assignmentController');

router.post('/submit', upload.single('file'), submitAssignment);
router.get('/:name', getAssignment);
router.delete('/:name', deleteAssignment);

module.exports = router;



