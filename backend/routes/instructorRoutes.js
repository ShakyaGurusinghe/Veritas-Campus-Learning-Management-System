const express = require('express');
console.log('instructorRoutes.js is being loaded');
const router = express.Router();
const { 
    getModuleDetails, 
    addContentToModule, 
    updateContentInModule, 
    deleteContentFromModule, 
    createModule, 
    getAllModules, 
    getAllAssignments,
    createAssignmentForModule,
    updateAssignmentInModule 
} = require('../controllers/instructorController');

// GET all modules for instructor
router.get('/modules', getAllModules);

// GET module details for instructor
router.get('/modules/:moduleId', getModuleDetails);

// POST create a new module
router.post('/modules', createModule);

// POST add content to a module
router.post('/modules/:moduleId/content', addContentToModule);

// PUT update content in a module
router.put('/modules/:moduleId/content/:contentId', updateContentInModule);

// DELETE content from a module
router.delete('/modules/:moduleId/content/:contentId', deleteContentFromModule);

// GET all assignments for instructor
router.get('/assignments', getAllAssignments);

// POST add a new assignment to a module
router.post('/modules/:moduleId/assignments', createAssignmentForModule);

// PUT update an assignment within a module
router.put('/modules/:moduleId/assignments/:assignmentId', updateAssignmentInModule);

module.exports = router; 