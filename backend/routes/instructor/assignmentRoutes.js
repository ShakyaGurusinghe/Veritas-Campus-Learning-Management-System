const express = require('express');
const router = express.Router();
const assignmentController = require('../../controllers/instructor/assignmentController');

console.log('[DEBUG-ROUTES] assignmentRoutes loaded at', new Date().toISOString());

router.use((req, res, next) => {
  console.log(`[DEBUG-ROUTES] Route: ${req.method} /api/instructor${req.path}, Params: ${JSON.stringify(req.params)}, Body: ${JSON.stringify(req.body || {})}, Files: ${req.files ? Object.keys(req.files) : 'none'} at ${new Date().toISOString()}`);
  next();
});

// Create a new assignment
router.post('/assignments/:moduleId', assignmentController.createAssignment);

// Get all assignments
router.get('/assignments', assignmentController.getAllAssignments);

// Get a single assignment by ID
router.get('/assignments/:id', assignmentController.getAssignmentById);

// Update an assignment by ID
router.put('/assignments/:id', assignmentController.updateAssignment);

// Delete an assignment by ID
router.delete('/assignments/:id', assignmentController.deleteAssignment);

console.log('[DEBUG-ROUTES] Assignment routes registered: POST /assignments/:moduleId, GET /assignments, GET/PUT/DELETE /assignments/:id');

module.exports = router;