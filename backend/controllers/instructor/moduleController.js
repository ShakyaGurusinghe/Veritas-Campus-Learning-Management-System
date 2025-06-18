const Module = require('../../models/Module');
const Assignment = require('../../models/assignmentmodel');

// Create a new module
exports.createModule = async (req, res) => {
  try {
    const { title, description, week, year, semester } = req.body;

    if (!title || !description || !week || !year || !semester) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newModule = new Module({
      title,
      description,
      week: parseInt(week),
      year: parseInt(year),
      semester: parseInt(semester),
      createdAt: new Date(),
    });

    await newModule.save();
    
    res.status(201).json({
      message: 'Module created successfully',
      module: newModule
    });
  } catch (error) {
    console.error('Error creating module:', error);
    res.status(500).json({ error: 'Server error while creating module' });
  }
};

// Get all modules, filtered by year and semester
exports.getAllModules = async (req, res) => {
  try {
    const { year, semester } = req.query;
    const filter = {};
    if (year) filter.year = parseInt(year);
    if (semester) filter.semester = parseInt(semester);

    const modules = await Module.find(filter).sort({ week: 1 });
    res.status(200).json(modules);
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ error: 'Server error while fetching modules' });
  }
};

// Get a single module by ID
exports.getModuleById = async (req, res) => {
  try {
    const { id } = req.params;
    const module = await Module.findById(id);

    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Fetch assignments for this module
    const assignments = await Assignment.find({ moduleId: id }).sort({ createdAt: -1 });
    
    // Create a response object that includes the module and its assignments
    const moduleWithContent = {
      ...module.toObject(),
      assignments: assignments
    };

    res.status(200).json(moduleWithContent);
  } catch (error) {
    console.error('Error fetching module:', error);
    res.status(500).json({ error: 'Server error while fetching module' });
  }
};

// Update a module by ID
exports.updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, week, year, semester } = req.body;

    if (!title || !description || !week || !year || !semester) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedModule = await Module.findByIdAndUpdate(
      id,
      { title, description, week: parseInt(week), year: parseInt(year), semester: parseInt(semester), updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedModule) {
      return res.status(404).json({ error: 'Module not found' });
    }

    res.status(200).json({
      message: 'Module updated successfully',
      module: updatedModule
    });
  } catch (error) {
    console.error('Error updating module:', error);
    res.status(500).json({ error: 'Server error while updating module' });
  }
};

// Delete a module by ID
exports.deleteModule = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedModule = await Module.findByIdAndDelete(id);

    if (!deletedModule) {
      return res.status(404).json({ error: 'Module not found' });
    }

    res.status(200).json({
      message: 'Module deleted successfully',
      module: deletedModule
    });
  } catch (error) {
    console.error('Error deleting module:', error);
    res.status(500).json({ error: 'Server error while deleting module' });
  }
};