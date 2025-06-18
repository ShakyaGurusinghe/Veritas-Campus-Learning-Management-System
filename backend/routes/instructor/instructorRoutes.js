const express = require('express');
const router = express.Router();
const moduleController = require('../../controllers/instructor/moduleController');

// Debug log for all routes
router.use((req, res, next) => {
  console.log(`${req.method} /api/instructor/modules${req.path} called`);
  next();
});

// Get all modules
router.get('/', moduleController.getAllModules);

// Get a single module by ID
router.get('/:id', moduleController.getModuleById);

// Create a new module
router.post('/', moduleController.createModule);

// Update a module by ID
router.put('/:id', moduleController.updateModule);

// Delete a module by ID
router.delete('/:id', moduleController.deleteModule);

module.exports = router;