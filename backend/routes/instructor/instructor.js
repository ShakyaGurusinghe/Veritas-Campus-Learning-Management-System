const express = require('express');
const router = express.Router();
const {
  createAssignment,
  getAllAssignments,
  deleteAssignment,
  getAssignmentById,
  updateAssignment
} = require('../controllers/instructor/assignmentController');

router.get('/test', (req, res) => res.send('Route working'));

router.post('/assignments', createAssignment);
router.get('/assignments', getAllAssignments);
router.get('/assignments/:id', getAssignmentById);
router.put('/assignments/:id', updateAssignment);
router.delete('/assignments/:id', deleteAssignment);

module.exports = router;